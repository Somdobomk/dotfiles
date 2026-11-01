-- Television (tv) pickers for files, text, and any other tv channel.
-- Needs `brew install television fd ripgrep`
return {
  {
    "alexpasmantier/tv.nvim",
    cmd = "Tv",
    keys = {
      { "<leader>p", "<cmd>Tv files<CR>", desc = "Find files" },
      { "<leader>/", "<cmd>Tv text<CR>", desc = "Search text in files" },
      { "<leader>tv", "<cmd>Tv<CR>", desc = "Pick a Television channel" },
      -- Same letters as Cmd+Shift+P in the other apps
      { "<leader>P", "<cmd>Tv<CR>", desc = "Command palette (Television channels)" },
    },
    opts = {
      window = { border = "rounded" },
    },
  },
}
