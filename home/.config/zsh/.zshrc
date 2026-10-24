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
# Run the original with a leading backslash or `command`: \grep, command find
alias vim='nvim'
alias cat='bat --paging=never'
export BAT_THEME='gruvbox-dark' # matches the Gruvbox theme in the other apps
alias grep='rg'
alias find='fd'
alias du='dust'

if command -v eza >/dev/null 2>&1; then
  alias ls='eza --icons --group-directories-first'
  alias lsa='eza -a --icons --group-directories-first'
  alias ll='eza -l --icons --group-directories-first --no-user --header --time-style long-iso'
  alias lla='eza -la --icons --group-directories-first --no-user --header --time-style long-iso'
fi

# iCloud Drive: "icloud" jumps there; ~icloud works in paths (cd ~icloud/Downloads)
hash -d icloud="$HOME/Library/Mobile Documents/com~apple~CloudDocs"
alias icloud='cd ~icloud'

# Notes: ~/GitHub/second-brain, next to this repo (private repo
# Somdobomk/second-brain). Obsidian's per-machine files (open tabs, layout,
# .trash) are gitignored there.
notes-sync() {
  (
    builtin cd ~/GitHub/second-brain || return
    git add -A
    if ! git diff --cached --quiet; then
      git status --short
      git commit -q -m "notes $(date +%F)"
    fi
    if ! git pull -q --rebase; then
      echo "Pull failed. If two machines changed the same note, fix the conflict, then run: git rebase --continue" >&2
      return 1
    fi
    git push -q && git log -1 --format='Synced: %h %s'
  )
}

# Updates. Run all three with: brewup && macosstore && macosup
brewup() {
  brew update && brew upgrade && brew cleanup
}
# Mac App Store apps (needs the App Store signed in)
macosstore() {
  mas outdated && mas upgrade
}
# Only lists macOS updates; install them with: sudo softwareupdate --install --all
macosup() {
  softwareupdate --list
}

# Television (tv): Ctrl+R searches history; Ctrl+T picks what fits the command
# being typed (files, or folders after `cd`, branches after `git checkout`...)
if command -v tv >/dev/null 2>&1; then
  source <(tv init zsh)
fi

# Zoxide: `cd foo` jumps to the most-used folder matching "foo"
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init zsh --cmd cd)"
  # `cdi`: pick a visited folder with Television instead of fzf
  cdi() {
    local dir
    dir=$(tv zoxide) && [[ -n $dir ]] && cd -- "$dir"
  }
fi

# Starship prompt
if command -v starship >/dev/null 2>&1; then
  eval "$(starship init zsh)"
fi
