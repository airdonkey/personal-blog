@echo off
echo ========================================
echo Project Cleanup Script
echo ========================================
echo.

cd /d C:\Users\zhoup\Desktop\professional-blog

echo [1/4] Deleting test files...
del /q content\posts\our-emblem-*.md 2>nul
del /q content\posts\testing-*.md 2>nul
del /q content\posts\sample-*.md 2>nul
del /q STATUS.txt 2>nul
del /q test-publish.py 2>nul
del /q publish-with-log.py 2>nul
del /q simple-test.py 2>nul
del /q C:\Users\zhoup\Desktop\debug.txt 2>nul
echo   Done

echo.
echo [2/4] Deleting old example articles...
del /q content\posts\ai-strategy-paradox.zh.md 2>nul
del /q content\posts\digital-transformation.zh.md 2>nul
del /q content\posts\products-vs-platforms.zh.md 2>nul
echo   Done

echo.
echo [3/4] Verifying core files...
if exist publish_article.py (
    echo   OK: publish_article.py exists
) else (
    echo   ERROR: publish_article.py not found!
    pause
    exit /b 1
)

if exist drafts\chinese.txt (
    echo   OK: drafts\chinese.txt exists
) else (
    echo   WARNING: drafts\chinese.txt not found
)

if exist config.toml (
    echo   OK: config.toml exists
) else (
    echo   ERROR: config.toml not found!
    pause
    exit /b 1
)

echo.
echo [4/4] Current articles:
dir /b content\posts\*.md 2>nul
if errorlevel 1 (
    echo   (No articles)
)

echo.
echo ========================================
echo Cleanup Complete!
echo ========================================
echo.
echo Status:
echo   - Test files deleted
echo   - Example articles deleted
echo   - Core files verified
echo.
echo Next steps:
echo   1. Edit drafts\chinese.txt and drafts\english.txt in VSCode
echo   2. Run: python publish_article.py
echo   3. Run: publish.bat
echo.
pause
