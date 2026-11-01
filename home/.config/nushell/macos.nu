# macOS-only commands. env.nu copies this file to the cache that config.nu loads.

# Keep wget's HSTS file out of $HOME
def --wrapped wget [...rest] {
  ^wget $"--hsts-file=($env.TMPDIR? | default '/tmp' | path join 'wget-hsts')" ...$rest
}

# iCloud Drive. Unlike zsh there is no ~icloud path shortcut.
def --env icloud [] {
  cd ($nu.home-dir | path join "Library" "Mobile Documents" "com~apple~CloudDocs")
}

# Updates. Run all three with: brewup; macosstore; macosup
def brewup [] {
  for step in [[update] [upgrade] [cleanup]] {
    ^brew ...$step
    if $env.LAST_EXIT_CODE != 0 { return }
  }
}
def macosstore [] {
  ^mas outdated
  if $env.LAST_EXIT_CODE == 0 { ^mas upgrade }
}
def macosup [] {
  ^softwareupdate --list
}

