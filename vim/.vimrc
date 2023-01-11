" Specify a directory for plugins
call plug#begin("~/.vim/plugged")

Plug 'morhetz/gruvbox'

" Initialize plugin system
call plug#end()

set number
set smarttab
set cindent
set tabstop=2
set shiftwidth=2
" always uses spaces instead of tab characters
set expandtab

let g:gruvbox_italic="1"
let g:gruvbox_contrast_dark="hard"
let g:gruvbox_italicize_strings="1"
set background=dark
colorscheme gruvbox
