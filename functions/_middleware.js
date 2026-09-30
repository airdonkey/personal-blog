const COOKIE_NAME = "zpl_review_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const TOKEN_MESSAGE = "zhoupenglong-review-v1";

function base64Url(bytes) {
    let binary = "";
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function makeToken(secret) {
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(TOKEN_MESSAGE)
    );

    return base64Url(new Uint8Array(signature));
}

function getCookie(request, name) {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(";");

    for (const cookie of cookies) {
        const [key, ...value] = cookie.trim().split("=");

        if (key === name) {
            return value.join("=");
        }
    }

    return null;
}

function getSafeNextPath(value) {
    if (!value) return "/";

    try {
        const decoded = decodeURIComponent(value);

        if (
            decoded.startsWith("/") &&
            !decoded.startsWith("//") &&
            !decoded.includes("\\")
        ) {
            return decoded;
        }
    } catch {
        // Ignore invalid URL encoding.
    }

    return "/";
}

function loginPage(nextPath, error = "") {
    const escapedNext = nextPath
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const errorHtml = error
        ? `<p class="error">${error}</p>`
        : "";

    return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Zhou Penglong — Preview</title>
<style>
    :root {
        color-scheme: light;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #f5f3ef;
        color: #242424;
        font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "Noto Sans",
            sans-serif;
    }

    main {
        width: min(420px, calc(100% - 40px));
        padding: 42px;
        background: white;
        border: 1px solid #ddd8d0;
        box-shadow: 0 12px 40px rgba(0,0,0,.06);
    }

    h1 {
        margin: 0 0 10px;
        font-family: Georgia, serif;
        font-size: 28px;
        font-weight: 500;
    }

    p {
        line-height: 1.6;
    }

    .intro {
        color: #666;
        margin-bottom: 28px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
    }

    input {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #bbb;
        font-size: 16px;
        border-radius: 2px;
    }

    button {
        width: 100%;
        margin-top: 14px;
        padding: 12px;
        border: 0;
        background: #242424;
        color: white;
        font-size: 15px;
        cursor: pointer;
    }

    .error {
        color: #a33;
        margin: 0 0 18px;
    }

    footer {
        margin-top: 28px;
        color: #888;
        font-size: 12px;
    }
</style>
</head>
<body>
<main>
    <h1>Site Preview</h1>
    <p class="intro">
        This website is currently under review.
        Please enter the shared review password.
    </p>

    ${errorHtml}

    <form method="POST" action="/__review_login">
        <input type="hidden" name="next" value="${escapedNext}">

        <label for="password">Review password</label>
        <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            autofocus
        >

        <button type="submit">Enter site</button>
    </form>

    <footer>
        Zhou Penglong · zhoupenglong.com
    </footer>
</main>
</body>
</html>`;
}

export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    const password = env.REVIEW_PASSWORD;

    if (!password) {
        return new Response(
            "Review password is not configured.",
            { status: 500 }
        );
    }

    // Logout
    if (
        url.pathname === "/__review_logout" &&
        request.method === "GET"
    ) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
                "Set-Cookie":
                    `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
            }
        });
    }

    // Login
    if (
        url.pathname === "/__review_login" &&
        request.method === "POST"
    ) {
        const formData = await request.formData();
        const submittedPassword = formData.get("password");
        const nextPath = getSafeNextPath(formData.get("next"));

        if (
            typeof submittedPassword === "string" &&
            submittedPassword === password
        ) {
            const token = await makeToken(password);

            return new Response(null, {
                status: 303,
                headers: {
                    "Location": nextPath,
                    "Set-Cookie":
                        `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`
                }
            });
        }

        return new Response(
            loginPage(nextPath, "Incorrect password. Please try again."),
            {
                status: 401,
                headers: {
                    "Content-Type": "text/html; charset=UTF-8",
                    "Cache-Control": "no-store"
                }
            }
        );
    }

    // Check authentication
    const suppliedToken = getCookie(request, COOKIE_NAME);
    const expectedToken = await makeToken(password);

    if (suppliedToken === expectedToken) {
        return context.next();
    }

    // Not authenticated: show password page.
    return new Response(
        loginPage(url.pathname + url.search),
        {
            status: 401,
            headers: {
                "Content-Type": "text/html; charset=UTF-8",
                "Cache-Control": "no-store"
            }
        }
    );
}
