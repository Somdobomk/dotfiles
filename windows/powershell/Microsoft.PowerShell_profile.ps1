# PowerShell 7 profile. windows\install.ps1 points $PROFILE (in OneDrive
# Documents) at this file, so edit it here. Mirrors home\.config\zsh\.zshrc
# on macOS where PowerShell allows.
#
# Startup is kept fast: no network calls, tool init scripts are cached, and
# Terminal-Icons loads right after the first prompt.

$Dotfiles = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent

# Shared with macOS: home\.config\starship.toml
$env:STARSHIP_CONFIG = Join-Path $Dotfiles 'home\.config\starship.toml'

# Editor: Zed locally, Neovim over SSH (no window to open there)
$env:EDITOR = if ($env:SSH_CONNECTION) { 'nvim' } else { 'zed --wait' }
$env:VISUAL = $env:EDITOR

# Keep less's history (used by git) out of $HOME
$env:LESSHISTFILE = Join-Path $env:TEMP 'lesshst'

# Preferred commands, same as macOS. `ls` stays PowerShell's own, so its
# output can still be piped as objects.
# Run the original with its full name: Get-Content, findstr, find.exe
Set-Alias vim nvim
if (Get-Command bat -ErrorAction SilentlyContinue) {
    Remove-Alias cat -Force -ErrorAction SilentlyContinue
    function cat { bat --paging=never @args }
}
if (Get-Command rg -ErrorAction SilentlyContinue) { Set-Alias grep rg } else { Set-Alias grep findstr }
if (Get-Command fd -ErrorAction SilentlyContinue) { Set-Alias find fd }
if (Get-Command dust -ErrorAction SilentlyContinue) { Set-Alias du dust }

if (Get-Command eza -ErrorAction SilentlyContinue) {
    function lsa { eza -a --icons --group-directories-first @args }
    function ll { eza -l --icons --group-directories-first --no-user --header --time-style long-iso @args }
    function lla { eza -la --icons --group-directories-first --no-user --header --time-style long-iso @args }
} else {
    function lsa { Get-ChildItem -Force @args }
    function ll { Get-ChildItem @args | Format-Table -AutoSize }
    function lla { Get-ChildItem -Force @args | Format-Table -AutoSize }
}
Set-Alias la lsa


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

Function wingetup {
  # Updates PowerShell too, since it's a winget app.
  # --include-unknown also upgrades apps whose installed version winget can't read
  winget upgrade --all --include-unknown
}
Function winup {
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

# Directories in bold blue instead of PowerShell's blue background. Matters
# until Terminal-Icons loads, which colors them itself.
$PSStyle.FileInfo.Directory = "`e[34;1m"

# Load Terminal-Icons once the first prompt is up. It rewrites its theme files
# on every import, so tabs opening together could corrupt them: the mutex
# makes them take turns, and a corrupted copy is moved aside and rebuilt.
$null = Register-EngineEvent -SourceIdentifier PowerShell.OnIdle -MaxTriggerCount 1 -Action {
    $mutex = [System.Threading.Mutex]::new($false, 'Local\TerminalIconsImport')
    $locked = $mutex.WaitOne(10000)
    try {
        Import-Module Terminal-Icons -Global -ErrorVariable importErrors -ErrorAction SilentlyContinue
        if ($importErrors) {
            $themes = Join-Path ([Environment]::GetFolderPath('ApplicationData')) 'powershell\Community\Terminal-Icons'
            Rename-Item $themes "Terminal-Icons.bak-$(Get-Date -Format yyyyMMdd-HHmmss)" -ErrorAction SilentlyContinue
            Import-Module Terminal-Icons -Global -Force
        }
    } finally {
        if ($locked) { $mutex.ReleaseMutex() }
        $mutex.Dispose()
    }
}
