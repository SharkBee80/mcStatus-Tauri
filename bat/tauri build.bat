@echo off
chcp 65001

call npm run build
call npm run tauri build -- --target x86_64-pc-windows-msvc
call npm run tauri android build -- --target aarch64 --apk --split-per-abi

timeout /t 5 >nul
pause