return {
  {
    "ellisonleao/gruvbox.nvim",
    priority = 1000,
    opts = {
      contrast = "hard",
      transparent_mode = false,
    },
    config = function(_, opts)
      require("gruvbox").setup(opts)
      vim.o.background = "dark"
      vim.cmd.colorscheme("gruvbox")
    end,
  },
}
