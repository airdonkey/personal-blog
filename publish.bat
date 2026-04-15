@echo off
echo ========================================
echo Push to GitHub
echo ========================================
echo.

git add -A
echo Added all changes

echo.
set /p msg="Commit message (or press Enter for default): "
if "%msg%"=="" set msg=Update content

git commit -m "%msg%"
echo.

git push
echo.

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo Success! Site will update in 2-3 minutes
    echo https://zhoupenglong.com
    echo ========================================
) else (
    echo ========================================
    echo Push failed - check network/auth
    echo ========================================
)

echo.
pause