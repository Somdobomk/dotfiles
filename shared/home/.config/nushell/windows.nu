# Windows-only commands. env.nu copies this file to the cache that config.nu loads.

# Prompt markers (OSC 133) confuse Windows' console layer under WezTerm: after a
# command the prompt is drawn one line off, so the command line gets overwritten
# and Backspace on an empty prompt wipes or adds lines
$env.config.shell_integration.osc133 = false
# The update commands match the PowerShell profile's. Run them all with:
# wingetup; powershellup; winosup

# Updates: winget apps, PowerShell and winget included. Refreshes the package
# lists first, like `brew update`; --include-unknown also upgrades apps whose
# installed version winget can't read. Runs without prompts
def wingetup [] {
  ^winget source update
  ^winget upgrade --all --include-unknown --silent --disable-interactivity --accept-package-agreements --accept-source-agreements
}

# PowerShell modules installed from the PowerShell Gallery
def powershellup [] {
  ^pwsh -NoProfile -Command 'Update-Module'
}

# Only lists Windows updates; install them from Settings > Windows Update
def winosup [] {
  ^pwsh -NoProfile -Command "
    Write-Host 'Checking Windows Update (this can take a minute)...'
    $updates = (New-Object -ComObject Microsoft.Update.Session).CreateUpdateSearcher().Search('IsInstalled=0 and IsHidden=0').Updates
    if ($updates.Count) {
      $updates | ForEach-Object { $_.Title }
      Write-Host 'Install them with: start ms-settings:windowsupdate'
    } else {
      Write-Host 'Windows is up to date.'
    }
  "
}

# Back up WoW's addon settings, like `wowbackup` in the PowerShell profile
def wowbackup [] {
  ^pwsh -NoProfile -File 'C:\Program Files (x86)\World of Warcraft\backup.ps1'
}
