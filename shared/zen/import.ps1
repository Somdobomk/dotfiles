# Copy Zen Browser customizations from this folder into the Windows profile.
#
# Usage: .\import.ps1 [-Profile <profile-folder-name>]
#   Without -Profile, uses the profile whose prefs.js changed most recently.
#   Close Zen first, or it overwrites the files when it exits.

param([string]$Profile)

$ErrorActionPreference = 'Stop'
$ZenDir = $PSScriptRoot
$Profiles = Join-Path $env:APPDATA 'zen\Profiles'

if (Get-Process -Name zen -ErrorAction SilentlyContinue) {
  Write-Error 'Zen is running. Close it and run this again.'
}

if ($Profile) {
  $Target = Join-Path $Profiles $Profile
} else {
  # Most recently modified prefs.js = the profile in use
  $Target = Get-ChildItem -Path $Profiles -Filter prefs.js -Recurse -Depth 1 |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1 -ExpandProperty DirectoryName
}
if (-not $Target -or -not (Test-Path $Target)) {
  Write-Error "Profile not found. Open Zen once, then check about:profiles."
}
Write-Host "Importing into $(Split-Path $Target -Leaf)"

foreach ($File in 'zen-themes.json', 'zen-keyboard-shortcuts.json', 'containers.json', 'user.js') {
  $Source = Join-Path $ZenDir $File
  if (Test-Path $Source) { Copy-Item $Source $Target -Force }
}

$Chrome = Join-Path $Target 'chrome'
New-Item -ItemType Directory -Path $Chrome -Force | Out-Null
Copy-Item (Join-Path $ZenDir 'chrome\*') $Chrome -Recurse -Force

# Mod settings: Zen reads prefs.js on startup and later lines win, so
# appending applies them once. You can still change them in Zen afterwards.
$ModPrefs = Join-Path $ZenDir 'mod-prefs.js'
if (Test-Path $ModPrefs) {
  Get-Content $ModPrefs | Add-Content (Join-Path $Target 'prefs.js') -Encoding UTF8
}

Write-Host 'Done. Start Zen to load your mods and shortcuts.'
