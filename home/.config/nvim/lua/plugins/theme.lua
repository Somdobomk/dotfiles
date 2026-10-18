-- Everforest Dark Hard, matching Zed's "Everforest Dark Hard (material)"
-- and the Ghostty terminal colors
return {
  {
    "sainnhe/everforest",
    priority = 1000,
    config = function()
      vim.o.background = "dark"
      vim.g.everforest_background = "hard"
      vim.g.everforest_enable_italic = 1
      -- "material": popups share the editor background, separated by a border
      vim.g.everforest_float_style = "blend"
      vim.o.winborder = "rounded"

      -- Zed's Everforest theme colors strings aqua; the Neovim theme uses green
      vim.api.nvim_create_autocmd("ColorScheme", {
        pattern = "everforest",
        callback = function()
          vim.api.nvim_set_hl(0, "String", { fg = "#83c092" })
          vim.api.nvim_set_hl(0, "@string", { link = "String" })
        end,
      })

      vim.cmd.colorscheme("everforest")
    end,
  },
}
