# Neovim Quick Edit

A small Neovim setup for opening files quickly while using Zed or VS Code for primary development.

Included:
- `lazy.nvim` plugin manager
- Gruvbox Dark Hard theme
- Treesitter syntax highlighting
- `blink.cmp` completion from file paths, snippets, and the current buffer
- Optional `conform.nvim` formatting configuration

## Requirements

```sh
brew install neovim git
nvim --version
```

The setup targets current Neovim releases. No LSP servers are configured: this is intentionally a lightweight quick editor, and completion comes from paths, snippets, and words already in open buffers. It does not require language servers for those suggestions.

## Install

This folder is linked to `~/.config/nvim` by Stow, along with the rest of the dotfiles. See the [main README](../../../README.md#gnu-stow).

Launch with `nvim`. The `vim` alias in `.zshrc` also opens it. First launch downloads the plugin manager and plugins.

## Optional formatters

`conform.nvim` is installed by the plugin manager, but formatting only works when the matching formatter executable is installed.

To enable Prettier formatting, install Prettier in your project or globally with your Node package manager. Example global install:

```sh
npm install --global prettier
```

For Lua formatting, install StyLua. For Python, install Ruff. Formatting only works when the corresponding executable is installed.

## Hyper font

Set Hyper's font family to your installed GeistMono Nerd Font family name and font size to 16. Font settings belong to Hyper, not Neovim.

## Basic commands

- `<Space>w`: save
- `<Space>q`: quit
- `:Lazy`: plugin manager
- `:checkhealth`: health checks
- `:ConformInfo`: formatter status (when Conform is enabled)
