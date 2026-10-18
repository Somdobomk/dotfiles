# Install the fonts in this folder for the current user (Windows).
# Windows version of install.sh: no admin rights needed.
#
# Usage: .\install.ps1 [-DryRun]
#   -DryRun  list what would be installed without copying anything
#
# Paid fonts go in .\private\, which is gitignored and can be its own
# private repo. They're installed the same way if the folder exists.
# Apps that are already open see the new fonts after a restart.

param([switch]$DryRun)

$ErrorActionPreference = 'Stop'
$FontDir = $PSScriptRoot
$Dest = Join-Path $env:LOCALAPPDATA 'Microsoft\Windows\Fonts'
$Registry = 'HKCU:\Software\Microsoft\Windows NT\CurrentVersion\Fonts'
$SystemFonts = Join-Path $env:WINDIR 'Fonts'

$seen = @{}
$installed = 0
$skipped = 0

if (-not $DryRun) {
  New-Item -ItemType Directory -Path $Dest -Force | Out-Null
  # Never use -Force here: on an existing registry key it recreates the key
  # empty, unregistering every font already installed for this user
  if (-not (Test-Path $Registry)) { New-Item -Path $Registry | Out-Null }
}

# .otf before .ttf so the OpenType version wins when a font ships as both
$fonts = @('*.otf', '*.ttf') | ForEach-Object {
  Get-ChildItem -Path $FontDir -Filter $_ -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\\.git\\' }
}

foreach ($font in $fonts) {
  if ($seen.ContainsKey($font.BaseName)) { continue }
  $seen[$font.BaseName] = $true

  if ((Test-Path (Join-Path $Dest $font.Name)) -or (Test-Path (Join-Path $SystemFonts $font.Name))) {
    $skipped++
    continue
  }

  if ($DryRun) {
    Write-Host "would install $($font.FullName.Substring($FontDir.Length + 1))"
  } else {
    $target = Join-Path $Dest $font.Name
    Copy-Item $font.FullName $target
    # Windows loads per-user fonts from this list. The value name is only a
    # label; "(TrueType)" is what Windows uses for both .ttf and .otf.
    New-ItemProperty -Path $Registry -Name "$($font.BaseName) (TrueType)" -Value $target -PropertyType String -Force | Out-Null
  }
  $installed++
}

if ($DryRun) {
  Write-Host "$installed to install, $skipped already installed"
} else {
  Write-Host "Installed $installed fonts, skipped $skipped already installed"
}
