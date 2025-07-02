@echo off
echo ========================================
echo Thunder User Guide - Windows Build
echo ========================================

echo.
echo Cleaning previous build artifacts...
if exist "dist" (
    echo Removing dist folder...
    rmdir /s /q "dist"
)
if exist "dist-electron" (
    echo Removing dist-electron folder...
    rmdir /s /q "dist-electron"
)
if exist "release" (
    echo Removing release folder...
    rmdir /s /q "release"
)

echo.
echo Installing dependencies...
call yarn install

echo.
echo Building application...
call yarn build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Building Windows executable...
call yarn electron-builder --win

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Electron builder failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build completed successfully!
echo Check the 'release' folder for the output.
echo ========================================
pause 