@echo off
echo ========================================
echo Install Tools for Bilingual Blog
echo ========================================
echo.

REM Check if in correct directory
if not exist "config.toml" (
    echo ERROR: Please run this script in website root directory
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo [1/5] Checking Python...
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo X Python not found
    echo.
    echo Please install Python:
    echo 1. Visit https://python.org/downloads
    echo 2. Download and install latest version
    echo 3. Check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
) else (
    python --version
    echo OK Python installed
)

echo.
echo [2/5] Creating drafts folder...
if not exist "drafts" (
    mkdir drafts
    echo OK Created drafts folder
) else (
    echo OK drafts folder exists
)

echo.
echo [3/5] Creating desktop shortcuts...

set CURRENT_DIR=%CD%

echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = "%USERPROFILE%\Desktop\Publish-Article.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "%CURRENT_DIR%\new-article.bat" >> CreateShortcut.vbs
echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> CreateShortcut.vbs
echo oLink.Description = "Publish new bilingual article" >> CreateShortcut.vbs
echo oLink.IconLocation = "shell32.dll,70" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs

echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut2.vbs
echo sLinkFile = "%USERPROFILE%\Desktop\Push-Online.lnk" >> CreateShortcut2.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut2.vbs
echo oLink.TargetPath = "%CURRENT_DIR%\publish.bat" >> CreateShortcut2.vbs
echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> CreateShortcut2.vbs
echo oLink.Description = "Push articles to GitHub and deploy" >> CreateShortcut2.vbs
echo oLink.IconLocation = "shell32.dll,165" >> CreateShortcut2.vbs
echo oLink.Save >> CreateShortcut2.vbs

cscript //nologo CreateShortcut.vbs
cscript //nologo CreateShortcut2.vbs
del CreateShortcut.vbs
del CreateShortcut2.vbs

echo OK Desktop shortcuts created

echo.
echo [4/5] Creating sample drafts...

echo # Sample Article Title > drafts\sample-chinese.txt
echo. >> drafts\sample-chinese.txt
echo Write your Chinese content here. >> drafts\sample-chinese.txt

echo # Sample Article Title > drafts\sample-english.txt
echo. >> drafts\sample-english.txt
echo Write your English content here. >> drafts\sample-english.txt

echo OK Sample drafts created

echo.
echo [5/5] Testing script...
python publish-article.py --help >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo OK Script test passed
) else (
    echo ! Script might need adjustments, but basic functions should work
)

echo.
echo ========================================
echo OK Installation Complete!
echo ========================================
echo.
echo Desktop shortcuts:
echo   - Publish-Article.lnk
echo   - Push-Online.lnk
echo.
echo Next steps:
echo   1. Open drafts folder
echo   2. Edit chinese.txt and english.txt
echo   3. Double-click "Publish-Article" on desktop
echo   4. Double-click "Push-Online" on desktop
echo.
pause
