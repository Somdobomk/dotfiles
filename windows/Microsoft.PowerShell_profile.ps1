# Icons
Import-Module -Name Terminal-Icons

# PSReadLine
Set-PSReadLineOption -BellStyle None
Set-PSReadLineKeyHandler -Chord 'Ctrl+d' -Function DeleteChar
Set-PSReadLineOption -PredictionSource History

# Fzf
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+f' -PSReadlineChordReverseHistory 'Ctrl+r'

# Alias
Set-Alias vim nvim
Set-Alias grep findstr
Function chrisutil { irm christitus.com/win | iex }
Function winup { winget upgrade --all }
Function scup { scoop update }

# Oh My Posh Prompt
# oh-my-posh init pwsh | Invoke-Expression

# Starship Prompt
Invoke-Expression (&starship init powershell)