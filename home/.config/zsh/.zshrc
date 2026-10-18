# Homebrew (fallback for non-login shells that skip .zprofile)
if ! command -v brew >/dev/null 2>&1 && [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi
if command -v brew >/dev/null 2>&1; then
  export HOMEBREW_PREFIX="$(brew --prefix)"
  export PATH="$HOMEBREW_PREFIX/bin:$HOMEBREW_PREFIX/sbin:$PATH"
  FPATH="$HOMEBREW_PREFIX/share/zsh/site-functions:$FPATH"
fi

# History
HISTFILE="$HOME/.zsh_history"
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_SPACE
setopt SHARE_HISTORY
setopt EXTENDED_HISTORY

# Completion
autoload -Uz compinit
compinit
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

# Command autosuggestions
if [[ -n "${HOMEBREW_PREFIX:-}" &&
      -r "$HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh" ]]; then
  source "$HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh"
fi

# Syntax highlighting — keep this last
if [[ -n "${HOMEBREW_PREFIX:-}" &&
      -r "$HOMEBREW_PREFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" ]]; then
  source "$HOMEBREW_PREFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"
fi

# Antidote plugin manager
if [[ -n "${HOMEBREW_PREFIX:-}" &&
      -r "$HOMEBREW_PREFIX/opt/antidote/share/antidote/antidote.zsh" ]]; then
  source "$HOMEBREW_PREFIX/opt/antidote/share/antidote/antidote.zsh"
  antidote load
fi
