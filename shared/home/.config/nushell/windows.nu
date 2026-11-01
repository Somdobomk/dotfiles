# Windows-only commands. env.nu copies this file to the cache that config.nu loads.

# Updates: winget apps, like `wingetup` in the PowerShell profile
def wingetup [] {
  ^winget upgrade --all
}
