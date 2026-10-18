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
vim.opt.scrolloff = 8         -- keep 8 lines visible above and below the cursor
vim.opt.splitright = true     -- vertical splits open on the right
vim.opt.splitbelow = true     -- horizontal splits open below
vim.opt.cursorline = true
vim.opt.inccommand = "split"  -- live preview for :s/find/replace/

vim.keymap.set("n", "<leader>w", "<cmd>write<CR>", { desc = "Save file" })
vim.keymap.set("n", "<leader>q", "<cmd>quit<CR>", { desc = "Quit" })
vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<CR>", { desc = "Clear search highlight" })

local group = vim.api.nvim_create_augroup("config", { clear = true })

-- Briefly highlight copied text
vim.api.nvim_create_autocmd("TextYankPost", {
  group = group,
  callback = function() vim.hl.on_yank() end,
})

-- Reopen files at the last cursor position (skipped for git commit messages)
vim.api.nvim_create_autocmd("BufReadPost", {
  group = group,
  callback = function(args)
    local ft = vim.bo[args.buf].filetype
    if ft == "gitcommit" or ft == "gitrebase" then return end
    local mark = vim.api.nvim_buf_get_mark(args.buf, '"')
    if mark[1] > 0 and mark[1] <= vim.api.nvim_buf_line_count(args.buf) then
      pcall(vim.api.nvim_win_set_cursor, 0, mark)
    end
  end,
})

require("config.lazy")
