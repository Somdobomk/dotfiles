# Fig pre block. Keep at the top of this file.
[[ -f "$HOME/.fig/shell/zshrc.pre.zsh" ]] && builtin source "$HOME/.fig/shell/zshrc.pre.zsh"
# Path to zsh
export ZSH="$HOME/.zshrc"

# Enable zsh-completion
autoload -Uz compinit && compinit -u

# Prompt Theme
#ZSH_THEME="spaceship"

# Enable colors and change prompt:
autoload -U colors && colors

CASE_SENSITIVE="true"

# History in cache directory:
HISTSIZE=1000
SAVEHIST=1000

zstyle ':completion:*' menu select
# Auto complete with case insenstivity
zstyle ':completion:*' matcher-list '' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'

COMPLETION_WAITING_DOTS="true"
ENABLE_CORRECTION="true"
DISABLE_LS_COLORS="true"

# Custom aliases
alias ..='cd ..'
alias ...='cd ../..'

# GitHub
alias ga='git add .'
alias gcmsg='git commit -m'
alias gpull='git checkout master && git pull && git status'
alias gpush='git push origin'
alias gst='git status'
alias rebase='git checkout master && git pull && git checkout - && git rebase master'

# Colorize grep output (good for log files)
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'

# confirm before overwriting something
alias cp="cp -i"
alias mv='mv -i'
alias rm='rm -i'
#alias ls='ls -GpFh'
#alias lsa='ls -aGpFh'
alias ls='exa --icons --group-directories-first --sort=name'
alias lsa='exa --icons -a --no-user --group-directories-first --sort=name'
alias ll='exa --icons -l --no-user --header --group-directories-first --sort=name --time-style long-iso'
alias lla='exa --icons -la --no-user --header --group-directories-first --sort=name --time-style long-iso'
alias cat='bat'
alias nvim='vim'

# easier to read disk
alias df='df -h'             # human-readable sizes
alias free='free -m'         # show sizes in MB

# Copy SSH
alias copyssh='pbcopy < ~/.ssh/id_rsa.pub'

# Updating the OS

# Arch
alias psearch='sudo pacman -Ss '
alias pinstall='sudo pacman -S '
alias pupgrade='sudo pacman -Syyu '
alias asearch='yay '
alias ainstall='yay S '

# MacOS

# Brew Update
alias brewup='brew update; brew upgrade; brew cleanup; brew doctor'

# Store Apps Update
alias macosstore='mas upgrade'

# System Upgrade
alias macosup='sudo softwareupdate -i -a'

# Zshrc
alias editzshrc='code ~/.zshrc'
alias sourcezshrc='source ~/.zshrc'

if type brew &>/dev/null
then
  FPATH="$(brew --prefix)/share/zsh/site-functions:${FPATH}"

  autoload -Uz compinit
  compinit
fi

export PATH=$PATH:/usr/local/mysql/binexport PATH="/usr/local/sbin:$PATH"

# Arch Linux
# Zoxide
eval "$(zoxide init zsh)"

# Load zsh-autosuggestions
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh 2>/dev/null

# Load zsh-syntax-highlighting
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh 2>/dev/null

# MacOS
# Zoxide
#

# Load zsh-autosuggestions
#source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# Load zsh-syntax-highlighting
#source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# M1 MacOS
# Zoxide
#eval "$(zoxide init zsh)"

# Load zsh-autosuggestions
#source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# Load zsh-syntax-highlighting
#source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

eval "$(starship init zsh)"

# Fig post block. Keep at the bottom of this file.
[[ -f "$HOME/.fig/shell/zshrc.post.zsh" ]] && builtin source "$HOME/.fig/shell/zshrc.post.zsh"
