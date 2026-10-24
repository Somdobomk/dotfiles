# Set up this Windows PC from the dotfiles repo. Safe to run again.
#
# Usage: .\install.ps1                Install everything below
#        .\install.ps1 -SaveTerminal  Copy Windows Terminal's live settings
#                                     back into the repo, then commit them
#        .\install.ps1 -SaveApps      Save the list of installed apps to
#                                     windows\winget.json, then commit it
#
# Apps aren't installed here. On a fresh PC, run this first:
#   winget import windows\winget.json
#
# - PowerShell: $PROFILE (in OneDrive Documents) becomes a one-line file that
#   loads windows\powershell\Microsoft.PowerShell_profile.ps1 from this repo.
# - Windows Terminal: windows\terminal\settings.json is copied into place.
#   It's a copy, not a link, because Terminal replaces links when it saves.
# - Neovim: %LOCALAPPDATA%\nvim becomes a junction to home\.config\nvim.
# - WezTerm: ~\.config\wezterm becomes a junction to home\.config\wezterm.
# - Zed: %APPDATA%\Zed becomes a junction to home\.config\zed.
# - Obsidian: second-brain\.obsidian becomes a junction to obsidian\, if the
#   second-brain notes are cloned next to this repo.
# - Git: ~\.config\git becomes a junction to home\.config\git. The email goes
#   in ~\.config\git\local (gitignored), taken from ~\.gitconfig if it has one;
#   ~\.gitconfig is then moved aside, since it would override the shared config.
# - Television: home\.config\television is copied into tv's config folder,
#   next to the channels `tv update-channels` downloads.
# Anything replaced is first renamed to <name>.bak-<date>.

param([switch]$SaveTerminal, [switch]$SaveApps)

$ErrorActionPreference = 'Stop'
$WindowsDir = $PSScriptRoot
$Dotfiles = Split-Path $WindowsDir -Parent
$Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'

# Store, Preview, and unpackaged installs of Windows Terminal
$TerminalSettings = @(
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json"
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json"
  "$env:LOCALAPPDATA\Microsoft\Windows Terminal\settings.json"
) | Where-Object { Test-Path $_ }
$RepoTerminal = Join-Path $WindowsDir 'terminal\settings.json'

if ($SaveTerminal) {
  if (-not $TerminalSettings) { Write-Error 'Windows Terminal settings not found.' }
  Copy-Item $TerminalSettings[0] $RepoTerminal -Force
  Write-Host "Saved $($TerminalSettings[0]) to the repo. Review it with git diff."
  return
}

if ($SaveApps) {
  $Apps = Join-Path $WindowsDir 'winget.json'
  # Apps winget can't reinstall (no package in its sources) are left out
  $Output = winget export --output $Apps --accept-source-agreements --disable-interactivity
  # On failure winget leaves the old list in place, which would be saved again
  # below as if nothing had changed
  if ($LASTEXITCODE) {
    $Output | Select-Object -Last 2 | Write-Host
    Write-Error "winget export failed (exit code $LASTEXITCODE). The app list wasn't changed."
  }
  # So are runtimes and libraries: apps that need them pull them in again
  $Runtimes = '^Microsoft\.(VCRedist|VCLibs|UI\.Xaml|WindowsAppRuntime|DotNet\.(Runtime|DesktopRuntime|AspNetCore|Native)|AppInstaller)\b'
  # -DateKind String keeps CreationDate as written instead of converting it
  $List = Get-Content $Apps -Raw | ConvertFrom-Json -DateKind String
  foreach ($Source in $List.Sources) {
    $Source.Packages = @($Source.Packages | Where-Object { $_.PackageIdentifier -notmatch $Runtimes })
  }
  $List | ConvertTo-Json -Depth 10 | Set-Content $Apps -Encoding utf8
  Write-Host "Saved the app list to $Apps. Review it with git diff."
  return
}

function Backup ($Path) {
  $backup = "$Path.bak-$Stamp"
  Move-Item $Path $backup
  Write-Host "  backed up to $(Split-Path $backup -Leaf)"
}

# PowerShell profile ---------------------------------------------------------

$RepoProfile = Join-Path $WindowsDir 'powershell\Microsoft.PowerShell_profile.ps1'
$Stub = ". '$RepoProfile'"
$UserProfile = $PROFILE.CurrentUserCurrentHost
Write-Host "PowerShell profile: $UserProfile"
if ((Test-Path $UserProfile) -and (Get-Content $UserProfile -Raw).Trim() -eq $Stub) {
  Write-Host '  already set up'
} else {
  if (Test-Path $UserProfile) { Backup $UserProfile }
  New-Item -ItemType Directory -Path (Split-Path $UserProfile) -Force | Out-Null
  Set-Content $UserProfile $Stub -Encoding utf8
  Write-Host '  now loads the profile from the repo'
}

# Windows Terminal -----------------------------------------------------------

foreach ($Target in $TerminalSettings) {
  Write-Host "Windows Terminal: $Target"
  if ((Get-FileHash $Target).Hash -eq (Get-FileHash $RepoTerminal).Hash) {
    Write-Host '  already up to date'
    continue
  }
  Copy-Item $Target "$Target.bak-$Stamp"
  Write-Host "  backed up to $(Split-Path "$Target.bak-$Stamp" -Leaf)"
  Copy-Item $RepoTerminal $Target -Force
  Write-Host '  copied settings from the repo'
}
if (-not $TerminalSettings) { Write-Host 'Windows Terminal: not installed, skipped' }

# Linked folders -------------------------------------------------------------

function Link-Folder ($Name, $Path, $Target) {
  Write-Host "${Name}: $Path"
  $Existing = Get-Item $Path -Force -ErrorAction SilentlyContinue
  if ($Existing -and $Existing.LinkType -eq 'Junction' -and $Existing.Target -eq $Target) {
    Write-Host '  already linked'
    return
  }
  if ($Existing) { Backup $Path }
  New-Item -ItemType Directory -Path (Split-Path $Path) -Force | Out-Null
  # A junction needs no admin rights or Developer Mode, and works across drives
  New-Item -ItemType Junction -Path $Path -Target $Target | Out-Null
  Write-Host "  linked to $Target"
}

Link-Folder 'Neovim' (Join-Path $env:LOCALAPPDATA 'nvim') (Join-Path $Dotfiles 'home\.config\nvim')
Link-Folder 'WezTerm' (Join-Path $HOME '.config\wezterm') (Join-Path $Dotfiles 'home\.config\wezterm')
if (Get-Process -Name Zed -ErrorAction SilentlyContinue) {
  Write-Host "Zed: running, skipped. Close it and run this again."
} else {
  Link-Folder 'Zed' (Join-Path $env:APPDATA 'Zed') (Join-Path $Dotfiles 'home\.config\zed')
}

$Vault = Join-Path (Split-Path $Dotfiles -Parent) 'second-brain'
if (-not (Test-Path $Vault)) {
  Write-Host "Obsidian: $Vault isn't cloned, skipped"
} elseif (Get-Process -Name Obsidian -ErrorAction SilentlyContinue) {
  Write-Host "Obsidian: running, skipped. Close it and run this again."
} else {
  Link-Folder 'Obsidian' (Join-Path $Vault '.obsidian') (Join-Path $Dotfiles 'obsidian')
}

# Git ------------------------------------------------------------------------

Link-Folder 'Git' (Join-Path $HOME '.config\git') (Join-Path $Dotfiles 'home\.config\git')
$GitLocal = Join-Path $HOME '.config\git\local'
$GitConfig = Join-Path $HOME '.gitconfig'
if (-not (Test-Path $GitLocal)) {
  $Email = if (Test-Path $GitConfig) { git config --file $GitConfig user.email }
  if ($Email) {
    Set-Content $GitLocal "[user]`n`temail = $Email" -Encoding utf8
    Write-Host "  set the email in $GitLocal from ~\.gitconfig"
  } else {
    Write-Host "  no email set: Git won't commit until you add yours with:"
    Write-Host "  git config --file `"$GitLocal`" user.email you@example.com"
  }
}
if (Test-Path $GitConfig) {
  Write-Host "Git: $GitConfig overrides the shared config"
  Backup $GitConfig
}

# Television -----------------------------------------------------------------

$RepoTv = Join-Path $Dotfiles 'home\.config\television'
$Tv = Join-Path $env:LOCALAPPDATA 'television\config'
Write-Host "Television: $Tv"
New-Item -ItemType Directory -Path "$Tv\cable", "$Tv\themes" -Force | Out-Null
if ((Test-Path "$Tv\config.toml") -and (Get-FileHash "$Tv\config.toml").Hash -ne (Get-FileHash "$RepoTv\config.toml").Hash) {
  Copy-Item "$Tv\config.toml" "$Tv\config.toml.bak-$Stamp"
  Write-Host "  backed up config.toml to config.toml.bak-$Stamp"
}
Copy-Item "$RepoTv\config.toml" $Tv -Force
Copy-Item "$RepoTv\themes\*" "$Tv\themes" -Force
# Channels run in PowerShell here, which has no `ls -la`; eza does the same
(Get-Content "$RepoTv\cable\zoxide.toml" -Raw).Replace("ls -la --color=always '{}'", "eza -la --icons --color=always '{}'") |
  Set-Content "$Tv\cable\zoxide.toml" -NoNewline -Encoding utf8
Write-Host '  copied config, theme, and zoxide channel'
if ((Get-Command tv -ErrorAction SilentlyContinue) -and -not (Test-Path "$Tv\cable\pwsh-history.toml")) {
  # Ctrl+R needs the pwsh-history channel
  tv update-channels | Out-Null
  Write-Host '  downloaded the standard channels'
}

# Tools ----------------------------------------------------------------------

# Tools the configs above use, with their winget IDs
$Tools = [ordered]@{
  starship      = 'Starship.Starship'
  zoxide        = 'ajeetdsouza.zoxide'
  tv            = 'alexpasmantier.television'
  bat           = 'sharkdp.bat'
  eza           = 'eza-community.eza'
  rg            = 'BurntSushi.ripgrep.MSVC'
  fd            = 'sharkdp.fd'
  dust          = 'bootandy.dust'
  zed           = 'ZedIndustries.Zed'
  wezterm       = 'wez.wezterm'
  zig           = 'zig.zig'
  'tree-sitter' = 'tree-sitter.tree-sitter-cli'
}
$Missing = $Tools.Keys | Where-Object { -not (Get-Command $_ -ErrorAction SilentlyContinue) }
foreach ($Module in 'Terminal-Icons') {
  if (-not (Get-Module -ListAvailable -Name $Module)) {
    Write-Host "Missing module $Module. Install it with: Install-Module $Module -Scope CurrentUser"
  }
}
if ($Missing) {
  Write-Host "`nMissing tools (Neovim's treesitter needs tree-sitter, plus zig as its C compiler):"
  foreach ($Name in $Missing) { Write-Host "  winget install $($Tools[$Name])" }
}

Write-Host "`nDone. Open a new tab to load the new profile."
Write-Host 'PowerToys: Settings > General > Backup & restore > Restore, using windows\powertoys.'
