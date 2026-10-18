return {
  {
    "stevearc/conform.nvim",
    opts = {
      format_on_save = { timeout_ms = 1000, lsp_format = "never" },
      formatters_by_ft = {
        javascript = { "prettier" },
        javascriptreact = { "prettier" },
        typescript = { "prettier" },
        typescriptreact = { "prettier" },
        json = { "prettier" },
        css = { "prettier" },
        html = { "prettier" },
        markdown = { "prettier" },
        yaml = { "prettier" },
        lua = { "stylua" },
        python = { "ruff_format" },
        sh = { "shfmt" },
        bash = { "shfmt" },
      },
    },
  },
}
