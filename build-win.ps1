# Thunder User Guide - Windows Build Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Thunder User Guide - Windows Build" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nCleaning previous build artifacts..." -ForegroundColor Yellow

# Clean previous builds
$folders = @("dist", "dist-electron", "release")
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "Removing $folder folder..." -ForegroundColor Gray
        Remove-Item -Recurse -Force $folder -ErrorAction SilentlyContinue
    }
}

Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
$installResult = yarn install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nBuilding application..." -ForegroundColor Yellow
$buildResult = yarn build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nBuilding Windows executable..." -ForegroundColor Yellow
$electronResult = electron-builder --win
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Electron builder failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host "Check the 'release' folder for the output." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Read-Host "Press Enter to exit" 