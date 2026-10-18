-- Formatting is manual by default: <leader>f formats the buffer.
-- :FormatToggle turns format-on-save on or off for this session.
vim.g.format_on_save = false

return {
  {
    "stevearc/conform.nvim",
    event = { "BufWritePre" },
    cmd = { "ConformInfo" },
    keys = {
      {
        "<leader>f",
        function() require("conform").format({ async = true, lsp_format = "never" }) end,
        mode = { "n", "v" },
        desc = "Format buffer",
      },
    },
    init = function()
      vim.api.nvim_create_user_command("FormatToggle", function()
        vim.g.format_on_save = not vim.g.format_on_save
        vim.notify("Format on save " .. (vim.g.format_on_save and "on" or "off"))
      end, { desc = "Toggle format on save" })
    end,
    opts = {
      format_on_save = function()
        if vim.g.format_on_save then
          return { timeout_ms = 1000, lsp_format = "never" }
        end
      end,
      -- Add formatters as you install them, for example:
      --   python = { "ruff_format" },  -- brew install ruff
      --   sh = { "shfmt" },            -- brew install shfmt
      --   javascript = { "prettier" }, -- npm install -g prettier
      formatters_by_ft = {},
    },
  },
}
