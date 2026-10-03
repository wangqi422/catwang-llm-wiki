@echo off
chcp 65001 >nul
echo ====================================================
echo   启动调试模式 Chrome (端口 9222)
echo   专供 ai-batch-imagegen 接管, 独立数据目录, 不影响日常浏览器
echo ====================================================
echo.

set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CHROME% set CHROME="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
set DBGDIR=%LOCALAPPDATA%\ChromeDebugProfile

if not exist %CHROME% (
  echo [错误] 没找到 Chrome, 请手动改本脚本里的 CHROME 路径
  pause
  exit /b 1
)

echo 正在启动... 首次是干净实例, 需在里面登录一次相关平台。
echo  - Midjourney: https://www.midjourney.com/imagine  (并把 Speed 切到 Relax)
echo  - 司内 3000:  https://3000.woa.com/ai/  (gemini 和 openai 两个画图页各开一个)
start "" %CHROME% --remote-debugging-port=9222 --user-data-dir="%DBGDIR%" --restore-last-session https://www.midjourney.com/imagine

echo.
echo 已启动。请在打开的 Chrome 里登录好所有平台, 然后回到对话告诉我"开好了"。
echo (这个窗口可以关掉)
timeout /t 5 >nul
