# Dotfiles

My personal macOS configuration.

## Contents

Everything in [`config/`](config/) is symlinked into `~/.config`.

| Path                                                   | What it is                                                             | Links to                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------- |
| [`config/zsh/`](config/zsh/)                           | Zsh config and [Antidote](https://antidote.sh) plugin list             | `~/.config/zsh`           |
| [`config/nvim/`](config/nvim/)                         | Lightweight Neovim quick-edit setup ([details](config/nvim/README.md)) | `~/.config/nvim`          |
| [`config/zed/`](config/zed/)                           | [Zed](https://zed.dev) editor settings                                 | `~/.config/zed`           |
| [`config/starship.toml`](config/starship.toml)         | [Starship](https://starship.rs) prompt                                 | `~/.config/starship.toml` |
| [`hyper/.hyper.js`](hyper/.hyper.js)                   | [Hyper](https://hyper.is) terminal config                              | `~/.hyper.js`             |
| [`fonts/`](fonts/)                                     | Font collection and [install script](fonts/install.sh)                 | `~/Library/Fonts`         |
| [`wallpapers/`](wallpapers/)                           | Gruvbox wallpapers                                                     | —                         |

## Quick start (macOS)

1. Install [Homebrew](https://brew.sh), then the tools these configs use:

   ```sh
   brew install git neovim starship zoxide eza bat antidote \
     zsh-autosuggestions zsh-syntax-highlighting
   brew install --cask hyper font-geist-mono-nerd-font
   ```

2. Clone the repo:

   ```sh
   git clone https://github.com/Somdobomk/dotfiles.git ~/dotfiles
   ```

   To work from a fork, see [Fork.md](Fork.md).

3. Symlink the configs into place. `ln -s` fails instead of overwriting if a file already exists, so back up or remove the existing file first.

   ```sh
   mkdir -p ~/.config
   for item in ~/dotfiles/config/*; do
     ln -s "$item" ~/.config/
   done
   ln -s ~/dotfiles/hyper/.hyper.js ~/.hyper.js   # Hyper only reads ~/.hyper.js
   ```

4. Tell zsh to look in `~/.config/zsh`. This one-line `~/.zshenv` is the only zsh file left in `$HOME`:

   ```sh
   echo 'export ZDOTDIR="$HOME/.config/zsh"' > ~/.zshenv
   ```

5. Restart the shell with `exec zsh`.

## What's included

- **Shell:** Zsh with Antidote plugins (autosuggestions, syntax highlighting, completions), [zoxide](https://github.com/ajeetdsouza/zoxide), and [eza](https://github.com/eza-community/eza)/[bat](https://github.com/sharkdp/bat) aliases for `ls`/`cat`
- **Prompt:** [Starship](https://starship.rs)
- **Editor:** Neovim with lazy.nvim, Treesitter, blink.cmp, and Gruvbox ([details](config/nvim/README.md))
- **Terminal:** Hyper with the Everforest theme and GeistMono Nerd Font

## Fonts

### Install

Copy every font in [`fonts/`](fonts/) to `~/Library/Fonts`:

```sh
~/dotfiles/fonts/install.sh -n   # dry run: list what would be installed
~/dotfiles/fonts/install.sh      # install
```

The script installs one copy of each font and leaves out web formats and Windows builds. When a font ships as both `.otf` and `.ttf`, the `.otf` is used. Fonts that are already installed are never overwritten, so the script is safe to run again.

### Paid fonts

Paid fonts aren't in this repo because their licenses don't allow redistribution. They live in a separate private repo that's cloned into `fonts/private/`. That folder is gitignored, and the install script picks it up automatically when it exists:

```sh
git clone git@github.com:Somdobomk/dotfiles-fonts.git ~/dotfiles/fonts/private
~/dotfiles/fonts/install.sh
```

Without access to the private repo, skip the clone. The script installs only the free fonts.

### Favorites

- [Dank Mono](https://philpl.gumroad.com/l/dank-mono) (paid)
- [Skribble Mono](https://www.skribble.dev/)
- [Victor Mono](https://rubjo.github.io/victor-mono/)
- [Nerd Fonts](https://www.nerdfonts.com/), required for icons in eza and Starship
