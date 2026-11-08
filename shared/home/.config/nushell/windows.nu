# Windows-only commands. env.nu copies this file to the cache that config.nu loads.

# Updates: winget apps, like `wingetup` in the PowerShell profile
def wingetup [] {
  ^winget upgrade --all
}

# Back up WoW's addon settings, like `wowbackup` in the PowerShell profile
def wowbackup [] {
  ^pwsh -NoProfile -File 'C:\Program Files (x86)\World of Warcraft\backup.ps1'
}
