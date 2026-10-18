# Homebrew is set up in .zprofile; this covers non-login shells that skip it
if ! command -v brew >/dev/null 2>&1 && [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Shell state and cache live outside $HOME and the repo
mkdir -p "$HOME/.local/state/zsh" "$HOME/.cache/zsh"

# History
HISTFILE="$HOME/.local/state/zsh/history"
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_SPACE
setopt SHARE_HISTORY
setopt EXTENDED_HISTORY

# Plugins (Antidote). Loaded before compinit so zsh-completions is picked up.
if [[ -r "$HOMEBREW_PREFIX/opt/antidote/share/antidote/antidote.zsh" ]]; then
  source "$HOMEBREW_PREFIX/opt/antidote/share/antidote/antidote.zsh"
  antidote load "$ZDOTDIR/.zsh_plugins.txt" "$HOME/.cache/zsh/plugins.zsh"
fi

# Completion
autoload -Uz compinit
compinit -d "$HOME/.cache/zsh/zcompdump"
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list \
  '' \
  'm:{a-zA-Z}={A-Za-z}' \
  'r:|[._-]=* r:|=*' \
  'l:|=* r:|=*'

# Editor: Zed locally, Neovim over SSH (no window to open there)
if [[ -n "$SSH_CONNECTION" ]]; then
  export EDITOR="nvim"
else
  export EDITOR="zed --wait"
fi
export VISUAL="$EDITOR"

# Keep tool history out of $HOME, in the private per-user temp folder
_tmp="${TMPDIR:-/tmp}"
export LESSHISTFILE="${_tmp%/}/lesshst"
alias wget="wget --hsts-file=\"${_tmp%/}/wget-hsts\""
unset _tmp

# Preferred commands
alias vim='nvim'
alias cat='bat'

if command -v eza >/dev/null 2>&1; then
  alias ls='eza --icons --group-directories-first --sort=name'
  alias lsa='eza --icons -a --no-user --group-directories-first --sort=name'
  alias ll='eza --icons -l --no-user --header --group-directories-first --sort=name --time-style long-iso'
  alias lla='eza --icons -la --no-user --header --group-directories-first --sort=name --time-style long-iso'
fi

# Zoxide
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init zsh)"
fi

# Starship prompt
if command -v starship >/dev/null 2>&1; then
  eval "$(starship init zsh)"
fi
