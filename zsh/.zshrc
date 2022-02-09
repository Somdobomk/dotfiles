
#### FIG ENV VARIABLES ####
# Please make sure this block is at the start of this file.
[ -s ~/.fig/shell/pre.sh ] && source ~/.fig/shell/pre.sh
#### END FIG ENV VARIABLES ####
# Path to zsh
export ZSH="$HOME/.zshrc"

# Enable zsh-completion
autoload -Uz compinit && compinit -u

# Prompt Theme
ZSH_THEME="spaceship"

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

# Spaceship Prompt Options
SPACESHIP_PROMPT_ADD_NEWLINE=false
SPACESHIP_PROMPT_SEPARATE_LINE=false
SPACESHIP_CHAR_SYMBOL=❯
SPACESHIP_CHAR_SUFFIX=" "
SPACESHIP_EXEC_TIME_SHOW=false
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

# Copy SSH
alias copyssh='pbcopy < ~/.ssh/id_rsa.pub'

# Updating the OS

# Arch
alias psearch='sudo pacman -Ss '
alias pinstall='sudo pacman -S '
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
# Load autojump
source /usr/share/autojump/autojump.zsh
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

# Load zsh-autosuggestions
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh 2>/dev/null

# Load zsh-syntax-highlighting
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh 2>/dev/null

# MacOS
# Load autojump
#source /usr/local/share/autojump/autojump.zsh
#[ -f $(brew --prefix)/etc/profile.d/autojump.sh ] && . $(brew --prefix)/etc/profile.d/autojump.sh

# Load zsh-autosuggestions
#source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# Load zsh-syntax-highlighting
#source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# M1 MacOS
# Load autojump


# Load zsh-autosuggestions
#source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# Load zsh-syntax-highlighting
#source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Enable Spaceship
autoload -Uz promptinit; promptinit
prompt spaceship

#### FIG ENV VARIABLES ####
# Please make sure this block is at the end of this file.
[ -s ~/.fig/fig.sh ] && source ~/.fig/fig.sh
#### END FIG ENV VARIABLES ####
