# Nushell config. Mirrors the setup in ../zsh/.zshrc.
# Nushell is opt-in and zsh stays the login shell. Start it with `nu`.

$env.config.show_banner = false

# History: same size as zsh. Zsh's "leading space keeps a command out of
# history" has no Nushell equivalent.
$env.config.history.max_size = 50000
$env.config.history.file_format = "sqlite"
$env.config.history.sync_on_enter = true

# Completion: case-insensitive fuzzy matching, like the zsh matcher-list
$env.config.completions.case_sensitive = false
$env.config.completions.algorithm = "fuzzy"

# Preferred commands. Nushell's own `ls`, `find`, and `du` return tables, so
# they stay as they are: use `eza`, `fd`, and `dust` by name for the others.
alias vim = nvim
alias cat = bat --paging=never
alias grep = rg
alias lsa = eza -a --icons --group-directories-first
alias ll = eza -l --icons --group-directories-first --no-user --header --time-style long-iso
alias lla = eza -la --icons --group-directories-first --no-user --header --time-style long-iso

# Television (Ctrl+R history, Ctrl+T pickers), zoxide (`cd foo`), and the Starship
# prompt. Written by env.nu.
source ~/.cache/nushell/tv.nu
source ~/.cache/nushell/zoxide.nu
source ~/.cache/nushell/starship.nu

# Per-system commands from macos.nu / windows.nu, copied here by env.nu
source ~/.cache/nushell/os.nu

# After the zoxide setup, which defines its own fzf-based `cdi`
# `cdi`: pick a visited folder with Television
# Yazi (terminal file manager): `y` opens it and stays in the folder you leave it in
def --env y [...args] {
  let tmp = (mktemp -t "yazi-cwd.XXXXXX")
  ^yazi ...$args --cwd-file $tmp
  let cwd = (open $tmp | str trim)
  if ($cwd | is-not-empty) and $cwd != $env.PWD { cd $cwd }
  rm -fp $tmp
}
# The cut list app's screenshots (Mac)
def cutlist [] { ^yazi ([$env.HOME .cutlist-shots screenshots] | path join) }

def --env cdi [] {
  let dir = (^tv zoxide | str trim)
  if ($dir | is-not-empty) { cd $dir }
}
