@echo off
echo ========================================
echo Bilingual Article Publisher
echo ========================================
echo.

REM Check if in correct directory
if not exist "config.toml" (
    echo ERROR: Please run this script in website root directory
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo [1/3] Processing drafts...
python publish_article.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Article processing failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Preview website?
echo ========================================
echo Press y to preview, any other key to skip
set /p preview="Your choice: "

if /i "%preview%"=="y" (
    echo.
    echo Starting local preview...
    echo Visit: http://localhost:1313
    echo Press Ctrl+C to stop preview
    hugo server -D
)

echo.
echo ========================================
echo Complete!
echo ========================================
echo.
echo Next step: Run publish.bat to push online
pause
