@echo off
chcp 65001

@REM call npm run tauri build
call npm run tauri build -- --target x86_64-pc-windows-msvc

timeout /t 5 >nul
pause
