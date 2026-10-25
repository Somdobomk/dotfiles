# PowerShell 7 profile. windows\install.ps1 points $PROFILE (in OneDrive
# Documents) at this file, so edit it here. Mirrors home\.config\zsh\.zshrc
# on macOS where PowerShell allows.
#
# Startup is kept fast: no network calls, and tool init scripts are cached.

$Dotfiles = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent

# Shared with macOS: home\.config\starship.toml
$env:STARSHIP_CONFIG = Join-Path $Dotfiles 'home\.config\starship.toml'

# Editor: Zed locally, Neovim over SSH (no window to open there)
$env:EDITOR = if ($env:SSH_CONNECTION) { 'nvim' } else { 'zed --wait' }
$env:VISUAL = $env:EDITOR

# Keep less's history (used by git) out of $HOME
$env:LESSHISTFILE = Join-Path $env:TEMP 'lesshst'

# Preferred commands, same as macOS. `ls` and `dir` use eza when it's installed.
# Run the original with its full name: Get-ChildItem, Get-Content, findstr, find.exe
Set-Alias vim nvim
if (Get-Command bat -ErrorAction SilentlyContinue) {
    Remove-Alias cat -Force -ErrorAction SilentlyContinue
    function cat { bat --paging=never @args }
    $env:BAT_THEME = 'gruvbox-dark' # matches the Gruvbox theme in the other apps
}
if (Get-Command rg -ErrorAction SilentlyContinue) { Set-Alias grep rg } else { Set-Alias grep findstr }
if (Get-Command fd -ErrorAction SilentlyContinue) { Set-Alias find fd }
if (Get-Command dust -ErrorAction SilentlyContinue) { Set-Alias du dust }

if (Get-Command eza -ErrorAction SilentlyContinue) {
    # Gruvbox colors for eza (same string as home\.config\zsh\.zshrc):
    # directories blue, executables green, symlinks aqua, broken links red
    $env:EZA_COLORS = 'di=1;38;2;131;165;152:ex=38;2;184;187;38:ln=38;2;142;192;124:or=38;2;251;73;52:so=38;2;211;134;155:pi=38;2;250;189;47:bd=38;2;254;128;25:cd=38;2;254;128;25:ur=38;2;250;189;47:uw=38;2;251;73;52:ux=38;2;184;187;38:ue=38;2;184;187;38:gr=38;2;250;189;47:gw=38;2;251;73;52:gx=38;2;184;187;38:tr=38;2;250;189;47:tw=38;2;251;73;52:tx=38;2;184;187;38:sn=38;2;184;187;38:sb=38;2;184;187;38:uu=38;2;250;189;47:un=38;2;250;189;47:da=38;2;142;192;124:hd=4;38;2;146;131;116:xx=38;2;146;131;116'
    # `ls` and `dir` run eza too, so they look the same as ll. They no longer
    # give PowerShell objects: use Get-ChildItem to pipe files to other commands
    Remove-Alias ls, dir -Force -ErrorAction SilentlyContinue
    function ls { eza --icons --group-directories-first @args }
    function dir { eza --icons --group-directories-first @args }
    function lsa { eza -a --icons --group-directories-first @args }
    function ll { eza -l --icons --group-directories-first --no-user --header --time-style long-iso @args }
    function lla { eza -la --icons --group-directories-first --no-user --header --time-style long-iso @args }
} else {
    function lsa { Get-ChildItem -Force @args }
    function ll { Get-ChildItem @args | Format-Table -AutoSize }
    function lla { Get-ChildItem -Force @args | Format-Table -AutoSize }
}
Set-Alias la lsa

# Notes: the second-brain repo next to this one (private, Somdobomk/second-brain).
# Obsidian's per-machine files (open tabs, layout, .trash) are gitignored there.
function notes-sync {
    Push-Location (Join-Path (Split-Path $Dotfiles -Parent) 'second-brain') -ErrorAction Stop
    try {
        git add -A
        git diff --cached --quiet
        if ($LASTEXITCODE) {
            git status --short
            git commit -q -m "notes $(Get-Date -Format yyyy-MM-dd)"
        }
        git pull -q --rebase
        if ($LASTEXITCODE) {
            Write-Warning 'Pull failed. If two machines changed the same note, fix the conflict, then run: git rebase --continue'
            return
        }
        git push -q
        if (-not $LASTEXITCODE) { git log -1 --format='Synced: %h %s' }
    } finally {
        Pop-Location
    }
}

# PSReadLine -----------------------------------------------------------------

Set-PSReadLineOption -BellStyle None
Set-PSReadLineKeyHandler -Chord 'Ctrl+d' -Function DeleteChar
Set-PSReadLineOption -EditMode Windows
# Predictions need a real console; skip them when output is redirected
if (-not [Console]::IsOutputRedirected) {
    Set-PSReadLineOption -PredictionSource History
    Set-PSReadLineOption -PredictionViewStyle ListView
}

# History: keep 50,000 commands and drop older copies of repeated ones
Set-PSReadLineOption -MaximumHistoryCount 50000 -HistoryNoDuplicates
# Commands starting with a space aren't saved. Otherwise keep PSReadLine's
# default, which already skips lines that look like they hold a password.
Set-PSReadLineOption -AddToHistoryHandler {
    param([string]$line)
    if ($line.StartsWith(' ')) { return $false }
    [Microsoft.PowerShell.PSConsoleReadLine]::GetDefaultAddToHistoryOption($line)
}

# ↑/↓ search history for commands starting with what's already typed
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# Tab shows a menu of every match, like zsh's `menu select`
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

# Enhanced PowerShell Experience
Set-PSReadLineOption -Colors @{
    Command = 'Yellow'
    Parameter = 'Green'
    String = 'DarkCyan'
}

# Updates. Run them all with: wingetup; powershellup; winosup
Function wingetup {
  # Refresh the package lists, like `brew update`
  winget source update
  # Updates PowerShell and winget itself (App Installer) too, since they're
  # winget apps. --include-unknown also upgrades apps whose installed version
  # winget can't read. Runs without prompts
  winget upgrade --all --include-unknown --silent --disable-interactivity --accept-package-agreements --accept-source-agreements
}
# Only lists Windows updates; install them from Settings > Windows Update
Function winosup {
  Write-Host 'Checking Windows Update (this can take a minute)...'
  $searcher = (New-Object -ComObject Microsoft.Update.Session).CreateUpdateSearcher()
  $updates = $searcher.Search('IsInstalled=0 and IsHidden=0').Updates
  if ($updates.Count) {
    $updates | ForEach-Object { $_.Title }
    Write-Host 'Install them with: start ms-settings:windowsupdate'
  } else {
    Write-Host 'Windows is up to date.'
  }
}
Function powershellup {
  Update-Module
}

# Utility Command that tells you where the absolute path of commandlets are
function which ($command) {
  Get-Command -Name $command -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty Path -ErrorAction SilentlyContinue
}

# Tool init and completions --------------------------------------------------

# Runs `<exe> <args>` once and caches its output, then returns the cache path
# to dot-source. The cache is rebuilt when the exe is updated or the
# arguments change.
function Import-CachedInit ([string]$Exe, [string[]]$Arguments) {
    $command = Get-Command $Exe -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $command) { return }
    $cache = Join-Path $env:LOCALAPPDATA "pwsh-init-cache\$Exe.ps1"
    $header = "# $Exe $Arguments"
    if (-not (Test-Path $cache) -or
        (Get-Item $command.Source).LastWriteTime -gt (Get-Item $cache).LastWriteTime -or
        (Get-Content $cache -TotalCount 1) -ne $header) {
        New-Item -ItemType Directory -Path (Split-Path $cache) -Force | Out-Null
        $header, (& $command.Source @Arguments | Out-String) | Set-Content $cache -Encoding utf8
    }
    $cache
}

# Starship Prompt
if ($init = Import-CachedInit starship 'init', 'powershell', '--print-full-init') { . $init }

# Zoxide: `cd foo` jumps to the most-used folder matching "foo"
if ($init = Import-CachedInit zoxide 'init', 'powershell', '--cmd', 'cd') { . $init }

# Television (tv): Ctrl+R searches history; Ctrl+T picks what fits the command
# being typed (files, or folders after `cd`, branches after `git checkout`...)
if ($init = Import-CachedInit tv 'init', 'power-shell') {
    . $init
    # `cdi`: pick a visited folder with Television instead of fzf. Zoxide's
    # cdi alias goes first, since aliases win over functions.
    Remove-Item Alias:cdi -Force -ErrorAction SilentlyContinue
    function cdi {
        $dir = tv zoxide
        if ($dir) { Set-Location -LiteralPath $dir }
    }
}

# Tab completion for ripgrep and fd
if ($init = Import-CachedInit rg '--generate', 'complete-powershell') { . $init }
if ($init = Import-CachedInit fd '--gen-completions', 'powershell') { . $init }
Remove-Variable init -ErrorAction SilentlyContinue

# Tab completion for winget
Register-ArgumentCompleter -Native -CommandName winget -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
    [Console]::InputEncoding = [Console]::OutputEncoding = $OutputEncoding = [System.Text.Utf8Encoding]::new()
    $word = $wordToComplete.Replace('"', '""')
    $ast = $commandAst.ToString().Replace('"', '""')
    winget complete --word="$word" --commandline "$ast" --position $cursorPosition | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
    }
}

# Directories in bold Gruvbox blue (same as eza) for Get-ChildItem, instead of
# PowerShell's blue background
$PSStyle.FileInfo.Directory = "`e[1;38;2;131;165;152m"
