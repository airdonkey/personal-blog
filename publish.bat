@echo off
echo ========================================
echo 推送到 GitHub 并部署
echo ========================================
echo.

REM 检查是否有未提交的更改
git status --short > temp_status.txt
set /p changes=<temp_status.txt
del temp_status.txt

if "%changes%"=="" (
    echo 没有需要推送的更改
    pause
    exit /b 0
)

echo 待推送的更改:
echo.
git status --short
echo.

REM 获取提交信息
echo 请输入提交说明 (直接回车使用默认):
set /p commit_msg="提交说明: "

if "%commit_msg%"=="" (
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    set commit_msg=Update content %mydate%
)

echo.
echo [1/3] 添加文件...
git add .

echo [2/3] 提交更改...
git commit -m "%commit_msg%"

echo [3/3] 推送到 GitHub...
git push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ 推送成功！
    echo ========================================
    echo.
    echo Cloudflare Pages 正在构建...
    echo 预计2-3分钟后上线:
    echo https://zhoupenglong.com
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ 推送失败
    echo ========================================
    echo.
    echo 可能的原因:
    echo 1. 网络连接问题
    echo 2. GitHub 认证失败
    echo 3. 远程仓库冲突
    echo.
)

pause
