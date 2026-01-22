@echo off
title TNBF Website Sharing Tool
echo ===================================================
echo   TNBF Website Sharing Tool
echo   1. Starting local server on port 8080...
echo   2. Creating secure tunnel...
echo ===================================================

REM Start Python server in background
echo Starting Python HTTP Server...
start /B python -m http.server 8080

echo.
echo Waiting for server to start...
timeout /t 3 >nul

echo.
echo ===================================================
echo   IMPORTANT:
echo   1. Copy the URL starting with 'https://' below.
echo   2. Send it to your MD.
echo   3. Keep this window OPEN while they are viewing it.
echo   4. When done, close this window.
echo ===================================================
echo.
echo Tunnel URL:
call lt --port 8080

pause
