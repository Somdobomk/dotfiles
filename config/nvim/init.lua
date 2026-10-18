-- Minimal Neovim for quick edits.
-- Lives at ~/.config/nvim; launch with: nvim

vim.g.mapleader = " "
vim.g.maplocalleader = " "

vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.mouse = "a"
vim.opt.termguicolors = true
vim.opt.signcolumn = "yes"
vim.opt.updatetime = 250
vim.opt.timeoutlen = 400
vim.opt.expandtab = true
vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.undofile = true
vim.opt.clipboard = "unnamedplus"

vim.keymap.set("n", "<leader>w", "<cmd>write<CR>", { desc = "Save file" })
vim.keymap.set("n", "<leader>q", "<cmd>quit<CR>", { desc = "Quit" })
vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<CR>", { desc = "Clear search highlight" })

require("config.lazy")
