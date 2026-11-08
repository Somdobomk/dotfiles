# Nushell environment. Mirrors the setup in ../zsh/.zshrc and ../../.zshenv.
# Nothing here changes zsh: Nushell is opt-in, started with `nu`.

const here = (path self .)
let os = $nu.os-info.name

# Homebrew (macOS only)
if $os == "macos" {
  use std/util "path add"
  path add "/opt/homebrew/bin"
  path add "/opt/homebrew/sbin"
  $env.HOMEBREW_NO_ENV_HINTS = "1"
  $env.HOMEBREW_NO_ANALYTICS = "1"
}

# Editor: Zed locally, Helix over SSH (no window to open there)
$env.EDITOR = if ($env.SSH_CONNECTION? | is-not-empty) { "hx" } else { "zed --wait" }
$env.VISUAL = $env.EDITOR

# bat's theme matches the Gruvbox theme in the other apps
$env.BAT_THEME = "gruvbox-dark"

# Keep tool history out of $HOME, in the private per-user temp folder
$env.LESSHISTFILE = ($nu.temp-dir | path join "lesshst")

# Starship's config sits next to this folder. Windows has no ~/.config/starship.toml
# for Starship to find on its own, so point to it. Expand first: that follows the
# ~/.config/nushell link into the repo, where starship.toml is.
let starship_config = ($here | path expand | path dirname | path join "starship.toml")
if ($starship_config | path exists) { $env.STARSHIP_CONFIG = $starship_config }

# Prompt and tool setup. Each tool writes its Nushell setup to a cache file that
# config.nu loads. The file is empty when the tool isn't installed, so a missing
# tool never breaks startup.
let cache = ($nu.home-dir | path join ".cache" "nushell")
mkdir $cache

def cache-init [name: string, cmd: closure] {
  let file = ($nu.home-dir | path join ".cache" "nushell" $"($name).nu")
  if (which $name | is-not-empty) {
    do $cmd | save -f $file
  } else {
    "" | save -f $file
  }
}

cache-init starship { ^starship init nu }
cache-init zoxide { ^zoxide init nushell --cmd cd }
cache-init tv { ^tv init nu }

# Commands that only make sense on one system (macos.nu, windows.nu, linux.nu)
# are copied to a cache file that config.nu loads
let os_file = ($here | path join $"($os).nu")
let os_cache = ($cache | path join "os.nu")
if ($os_file | path exists) { open --raw $os_file | save -f $os_cache } else { "" | save -f $os_cache }
