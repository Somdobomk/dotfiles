# Path to zsh
export ZSH="$HOME/.zshrc"
#source $ZSH/.zshrc

# Enable zsh-completion
autoload -Uz compinit && compinit -u

# Enable Spaceship
autoload -Uz promptinit; promptinit
prompt spaceship

# Prompt Theme
ZSH_THEME="spaceship"

# Enable colors and change prompt:
autoload -U colors && colors

CASE_SENSITIVE="true"

# History in cache directory:
HISTSIZE=1000
SAVEHIST=

zstyle ':completion:*' menu select
# Auto complete with case insenstivity
zstyle ':completion:*' matcher-list '' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'

COMPLETION_WAITING_DOTS="true"
ENABLE_CORRECTION="true"
DISABLE_LS_COLORS="true"

# Spaceship
SPACESHIP_PROMPT_ADD_NEWLINE=false
SPACESHIP_PROMPT_SEPARATE_LINE=false
SPACESHIP_CHAR_SYMBOL=❯
SPACESHIP_CHAR_SUFFIX=" "
SPACESHIP_HG_SHOW=false
SPACESHIP_PACKAGE_SHOW=false
SPACESHIP_NODE_SHOW=false
SPACESHIP_RUBY_SHOW=false
SPACESHIP_ELM_SHOW=false
SPACESHIP_ELIXIR_SHOW=false
SPACESHIP_XCODE_SHOW_LOCAL=false
SPACESHIP_SWIFT_SHOW_LOCAL=false
SPACESHIP_GOLANG_SHOW=false
SPACESHIP_PHP_SHOW=false
SPACESHIP_RUST_SHOW=false
SPACESHIP_JULIA_SHOW=false
SPACESHIP_DOCKER_SHOW=false
SPACESHIP_DOCKER_CONTEXT_SHOW=false
SPACESHIP_AWS_SHOW=false
SPACESHIP_CONDA_SHOW=false
SPACESHIP_VENV_SHOW=false
SPACESHIP_PYENV_SHOW=false
SPACESHIP_DOTNET_SHOW=false
SPACESHIP_EMBER_SHOW=false
SPACESHIP_KUBECONTEXT_SHOW=false
SPACESHIP_TERRAFORM_SHOW=false
SPACESHIP_TERRAFORM_SHOW=false
SPACESHIP_VI_MODE_SHOW=false
SPACESHIP_JOBS_SHOW=false

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
alias ls='ls -GpFh'
alias lsa='ls -aGpFh'

# easier to read disk
alias df='df -h'             # human-readable sizes
alias free='free -m'         # show sizes in MB

# Brew Update
alias brewup='brew update; brew upgrade; brew cleanup; brew doctor'

# Copy SSH
alias copyssh='pbcopy < ~/.ssh/id_rsa.pub'

# MacOS Store Update
alias macosstore='mas upgrade'

# MacOS Update
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

[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

# Arch Linux

# Load autojump
#source /usr/share/autojump/autojump.zsh

# Load zsh-autosuggestions
#source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh 2>/dev/null

# Load zsh-syntax-highlighting
#source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh 2>/dev/null

# MacOS
source /usr/local/share/autojump/autojump.zsh
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
