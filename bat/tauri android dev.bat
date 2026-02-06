@echo off
chcp 65001

choice /C:123 /T 9 /D 3 /M "1 dev  2 dev --open android studio  或者  3 取消" /N

:begin
if %errorlevel%==1 goto Dev
if %errorlevel%==2 goto Dev_open
if %errorlevel%==3 goto CANCEL

:Dev
call npm run tauri android dev
goto end

:Dev_open
call npm run tauri android dev -- --open
goto end

:CANCEL
goto end

:end
timeout /t 5 >nul
pause
