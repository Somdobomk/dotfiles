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
