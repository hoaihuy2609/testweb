$DesktopPath = [Environment]::GetFolderPath('Desktop')
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$DesktopPath\iPhone Simulator.lnk")
$Shortcut.TargetPath = "C:\Users\Acer\.gemini\antigravity\scratch\mobile-simulator\OpenSimulator.bat"
$ChromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$ChromePath86 = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if (Test-Path $ChromePath) {
    $Shortcut.IconLocation = "$ChromePath,0"
} elseif (Test-Path $ChromePath86) {
    $Shortcut.IconLocation = "$ChromePath86,0"
}
$Shortcut.Save()
Write-Host "Created shortcut at: $DesktopPath"
