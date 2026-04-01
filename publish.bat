@echo off
echo ========================================
echo Push to GitHub and Deploy
echo ========================================
echo.

REM Check for uncommitted changes
git status --short > temp_status.txt
set /p changes=<temp_status.txt
del temp_status.txt

if "%changes%"=="" (
    echo No changes to push
    pause
    exit /b 0
)

echo Changes to be pushed:
echo.
git status --short
echo.

REM Get commit message
echo Enter commit message (press Enter for default):
set /p commit_msg="Message: "

if "%commit_msg%"=="" (
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    set commit_msg=Update articles %mydate%
)

echo.
echo [1/3] Adding files...
git add .

echo [2/3] Committing changes...
git commit -m "%commit_msg%"

echo [3/3] Pushing to GitHub...
git push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo OK Push successful!
    echo ========================================
    echo.
    echo Cloudflare Pages is building...
    echo Expected online in 2-3 minutes:
    echo https://zhoupenglong.com
    echo.
) else (
    echo.
    echo ========================================
    echo X Push failed
    echo ========================================
    echo.
    echo Possible reasons:
    echo 1. Network connection issue
    echo 2. GitHub authentication failed
    echo 3. Remote repository conflict
    echo.
)

pause
