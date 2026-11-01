-- Gruvbox Dark, matching Obsidian's "Obsidian gruvbox" theme, Zed's
-- "Gruvbox Dark", and the WezTerm terminal colors
return {
  {
    "ellisonleao/gruvbox.nvim",
    priority = 1000,
    config = function()
      vim.o.background = "dark"
      vim.o.winborder = "rounded"
      require("gruvbox").setup({
        contrast = "hard", -- #1d2021, like the other apps
        overrides = {
          -- Obsidian's red text selection
          Visual = { bg = "#8a2621" },
          -- Popups share the editor background, separated by a border
          NormalFloat = { bg = "#1d2021" },
          FloatBorder = { bg = "#1d2021" },
        },
      })
      vim.cmd.colorscheme("gruvbox")
    end,
  },
}
