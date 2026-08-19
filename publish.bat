@echo off
setlocal

where hugo >nul 2>&1
if errorlevel 1 (
    echo Hugo was not found. Install Hugo 0.165.0 before publishing.
    goto :fail
)

echo Running production build...
hugo --gc --minify
if errorlevel 1 goto :fail

for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT_BRANCH=%%B"
if "%CURRENT_BRANCH%"=="" (
    echo Could not determine the current Git branch.
    goto :fail
)

echo.
echo Current branch: %CURRENT_BRANCH%
echo Files that will be committed:
git status --short
echo.
set /p "CONFIRM=Commit all listed changes? [y/N]: "
if /I not "%CONFIRM%"=="y" goto :cancelled

set /p "MESSAGE=Commit message (press Enter for 'Update site'): "
if "%MESSAGE%"=="" set "MESSAGE=Update site"

git add -A
git diff --cached --quiet
if not errorlevel 1 (
    echo No changes to commit.
    goto :cancelled
)

git commit -m "%MESSAGE%"
if errorlevel 1 goto :fail

git push -u origin "%CURRENT_BRANCH%"
if errorlevel 1 goto :fail

echo.
echo Push succeeded.
if /I "%CURRENT_BRANCH%"=="main" (
    echo Cloudflare Pages will deploy the production site automatically.
) else (
    echo Open GitHub and merge this branch into main to deploy it.
)
goto :end

:cancelled
echo Nothing was published.
goto :end

:fail
echo Publishing stopped because a step failed.

:end
echo.
pause
endlocal
