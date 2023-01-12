# Imports the Terminal-Icons into the current instance of PowerShell
Import-Module -Name Terminal-Icons

# Set some options for PSReadLine to show the history of typed commands
Set-PSReadLineOption -BellStyle None
Set-PSReadLineKeyHandler -Chord 'Ctrl+d' -Function DeleteChar
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows

# Fzf (Import the fuzzy finder and set a shortcut key to begin searching)
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+f' -PSReadlineChordReverseHistory 'Ctrl+r'

# Alias
Set-Alias grep findstr
Set-Alias vim nvim

# ChrisTituTech YouTuber better ninite
Function chrisutil {
  irm christitus.com/win | iex
}

Function winup {
  winget upgrade --all
}
Function scup {
  scoop update
}

# Utility Command that tells you where the absolute path of commandlets are
function which ($command) {
  Get-Command -Name $command -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty Path -ErrorAction SilentlyContinue
}

# Initialize Oh My Posh Prompt
# oh-my-posh init pwsh | Invoke-Expression

# Starship Prompt
Invoke-Expression (&starship init powershell)
