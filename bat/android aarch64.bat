@echo off
chcp 65001

@REM call npm run tauri android build
call npm run tauri android build -- --target aarch64 --apk --split-per-abi
timeout /t 5 >nul
pause
