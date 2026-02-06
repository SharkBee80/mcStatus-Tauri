@echo off
chcp 65001

call npm run build

timeout /t 5 >nul
pause