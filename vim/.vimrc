" Specify a directory for plugins
call plug#begin("~/.vim/plugged/")

Plug 'morhetz/gruvbox'

" Initialize plugin system
call plug#end()

set relativenumber

set smarttab
set cindent
set tabstop=2
set shiftwidth=2
" always uses spaces instead of tab characters
set expandtab

colorscheme gruvbox
