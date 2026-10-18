# Neovim Quick Edit

A small Neovim setup for opening files quickly while using Zed or VS Code for primary development.

Included:
- `lazy.nvim` plugin manager, with versions pinned in `lazy-lock.json`
- Everforest Dark Hard theme, matching Zed and Ghostty
- Treesitter syntax highlighting and indentation, including zsh files (read with the bash parser) and git commit messages
- `blink.cmp` completion from file paths, snippets, and the current buffer
- `gitsigns.nvim` markers for added, changed, and removed lines
- `which-key.nvim` popup listing shortcuts after pressing `<Space>`
- `conform.nvim` for formatting, with no formatters set up by default

## Requirements

```sh
brew install neovim git tree-sitter-cli
```

`tree-sitter-cli` builds the Treesitter parsers. Without it, most languages fall back to basic highlighting. After installing it, run `:TSUpdate` once.

No LSP servers are configured: this is intentionally a lightweight quick editor, and completion comes from paths, snippets, and words already in open buffers.

## Install

This folder is linked to `~/.config/nvim` by Stow, along with the rest of the dotfiles. See the [main README](../../../README.md#gnu-stow).

Launch with `nvim`. The `vim` alias in `.zshrc` also opens it. First launch installs the plugins at the versions in `lazy-lock.json`.

## Plugin versions

`lazy-lock.json` records the exact commit of every plugin, so each machine gets the same versions.

- `:Lazy update` updates plugins and rewrites the lockfile. Commit it afterwards.
- `:Lazy restore` puts plugins back to the versions in the lockfile, for example after a bad update.

## Formatting

Formatting is manual: `<Space>f` formats the current buffer, or the selection in visual mode. `:FormatToggle` turns format-on-save on or off until Neovim quits.

No formatters are set up. To add one, install it, then add it to `formatters_by_ft` in [`lua/plugins/format.lua`](lua/plugins/format.lua):

```lua
formatters_by_ft = {
  python = { "ruff_format" },  -- brew install ruff
},
```

## Basic commands

- `<Space>w`: save
- `<Space>q`: quit
- `<Space>f`: format
- `Tab`: accept a completion suggestion (`Ctrl+N` / `Ctrl+P` move through the list)
- `:FormatToggle`: format on save on or off
- `:Lazy`: plugin manager
- `:checkhealth`: health checks
- `:ConformInfo`: formatter status
