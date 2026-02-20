@echo off
title iPhone 14 Pro Simulator
echo Dang khoi dong trinh gia lap...

:: Lay do phan giai man hinh de tinh toan vi tri ben phai
for /f "tokens=2 delims==" %%a in ('wmic path Win32_VideoController get CurrentHorizontalResolution /value') do set "screenWidth=%%a"

:: Mac dinh neu khong lay duoc thi de 1920
if "%screenWidth%"=="" set "screenWidth=1920"

:: Tinh toan vi tri: sat mep phai (ScreenWidth - Chieu rong cua so - mot chut margin)
set /a "posX=%screenWidth%-420"
set "posY=50"

:: Mo URL binh thuong trong trinh duyet mac dinh
start http://localhost:5173

if %errorlevel% neq 0 (
    echo Co loi khi mo trinh duyet. Hay dam bao ban da chay "npm run dev".
    pause
)

exit
