-- Windows has no C compiler by default, so parsers are built with Zig
-- (winget install zig.zig). Zig rejects the MSVC target the build passes,
-- so skip the default flags and let Zig use its own Windows target.
if vim.fn.has("win32") == 1 and not vim.env.CC then
  vim.env.CC = "zig cc"
  vim.env.CRATE_CC_NO_DEFAULTS = "1"
end

return {
  {
    "nvim-treesitter/nvim-treesitter",
    branch = "main",
    build = ":TSUpdate",
    config = function()
      require("nvim-treesitter").install({
        "bash", "css", "html", "javascript", "json", "lua",
        "markdown", "markdown_inline", "python", "toml",
        "tsx", "typescript", "vim", "vimdoc", "yaml",
        -- git files, for commit messages opened over SSH
        "diff", "git_config", "gitcommit", "gitignore",
      })

      -- There's no zsh parser; the bash one handles .zshrc and friends well
      vim.treesitter.language.register("bash", "zsh")

      vim.api.nvim_create_autocmd("FileType", {
        callback = function(args)
          if pcall(vim.treesitter.start, args.buf) then
            vim.bo[args.buf].indentexpr = "v:lua.require'nvim-treesitter'.indentexpr()"
          end
        end,
      })
    end,
  },
}
