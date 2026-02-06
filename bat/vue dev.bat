@echo off
chcp 65001

call npm run dev

timeout /t 5 >nul
pause