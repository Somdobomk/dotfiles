# Homebrew is set up in .zprofile; this covers non-login shells that skip it
if ! command -v brew >/dev/null 2>&1 && [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Drop duplicate entries from PATH and fpath automatically
typeset -U path fpath

# Shell state and cache live outside $HOME and the repo
mkdir -p "$HOME/.local/state/zsh" "$HOME/.cache/zsh"

# Options
setopt AUTO_CD              # type a folder name to cd into it
setopt INTERACTIVE_COMMENTS # allow # comments in typed commands
setopt NO_BEEP

# History
HISTFILE="$HOME/.local/state/zsh/history"
HISTSIZE=50000
SAVEHIST=50000
setopt HIST_IGNORE_ALL_DUPS # drop older copies of a repeated command
setopt HIST_IGNORE_SPACE    # commands starting with a space aren't saved
setopt HIST_REDUCE_BLANKS
setopt HIST_VERIFY          # show !! and !$ expansions before running them
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
zstyle ':completion:*' use-cache on
zstyle ':completion:*' cache-path "$HOME/.cache/zsh/completion"
zstyle ':completion:*' matcher-list \
  '' \
  'm:{a-zA-Z}={A-Za-z}' \
  'r:|[._-]=* r:|=*' \
  'l:|=* r:|=*'

# ↑/↓ search history for commands starting with what's already typed.
# Both sequences, since terminals send either depending on their mode.
autoload -Uz up-line-or-beginning-search down-line-or-beginning-search
zle -N up-line-or-beginning-search
zle -N down-line-or-beginning-search
bindkey '^[[A' up-line-or-beginning-search
bindkey '^[OA' up-line-or-beginning-search
bindkey '^[[B' down-line-or-beginning-search
bindkey '^[OB' down-line-or-beginning-search

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
alias cat='bat --paging=never'

if command -v eza >/dev/null 2>&1; then
  alias ls='eza --icons --group-directories-first'
  alias lsa='ls -a'
  alias ll='ls -l --no-user --header --time-style long-iso'
  alias lla='ll -a'
fi

# iCloud Drive: "icloud" jumps there; ~icloud works in paths (cd ~icloud/Downloads)
hash -d icloud="$HOME/Library/Mobile Documents/com~apple~CloudDocs"
alias icloud='cd ~icloud'

# Notes (~/notes, private repo Somdobomk/notes)
alias notes='zed ~/notes'
notes-sync() {
  (
    builtin cd ~/notes || return
    git add -A
    git diff --cached --quiet || git commit -q -m "notes $(date +%F)"
    git pull -q --rebase && git push -q && git log -1 --format='Synced: %h %s'
  )
}

# fzf: Ctrl+R searches history, Ctrl+T finds files, Alt+C jumps to a folder
if command -v fzf >/dev/null 2>&1; then
  export FZF_DEFAULT_OPTS="--height 40% --layout reverse --border \
--color bg+:#2e383c,fg:#d3c6aa,fg+:#d3c6aa,hl:#a7c080,hl+:#a7c080 \
--color info:#dbbc7f,prompt:#83c092,pointer:#e67e80,marker:#e69875,spinner:#d699b6,header:#7fbbb3,border:#495156"
  source <(fzf --zsh)
fi

# Zoxide: `cd foo` jumps to the most-used folder matching "foo"
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init zsh --cmd cd)"
fi

# Starship prompt
if command -v starship >/dev/null 2>&1; then
  eval "$(starship init zsh)"
fi
