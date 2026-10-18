# Dotfiles

My personal macOS configuration.

## Contents

[`home/`](home/) mirrors `$HOME` and is linked into place with [GNU Stow](#gnu-stow).

| Path                                                       | What it is                                                                   | Links to                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------- |
| [`home/.zshenv`](home/.zshenv)                             | Points zsh at `~/.config/zsh`                                                | `~/.zshenv`               |
| [`home/.config/zsh/`](home/.config/zsh/)                   | Zsh config and [Antidote](https://antidote.sh) plugin list                   | `~/.config/zsh`           |
| [`home/.config/nvim/`](home/.config/nvim/)                 | Lightweight Neovim quick-edit setup ([details](home/.config/nvim/README.md)) | `~/.config/nvim`          |
| [`home/.config/zed/`](home/.config/zed/)                   | [Zed](https://zed.dev) editor settings                                       | `~/.config/zed`           |
| [`home/.config/starship.toml`](home/.config/starship.toml) | [Starship](https://starship.rs) prompt                                       | `~/.config/starship.toml` |
| [`home/.hyper.js`](home/.hyper.js)                         | [Hyper](https://hyper.is) terminal config                                    | `~/.hyper.js`             |
| [`home/.hyper_plugins/`](home/.hyper_plugins/)             | Hyper plugin list                                                            | `~/.hyper_plugins`        |
| [`fonts/`](fonts/)                                         | Font collection and [install script](fonts/install.sh)                       | `~/Library/Fonts`         |
| [`wallpapers/`](wallpapers/)                               | Gruvbox wallpapers                                                           | —                         |

## Quick start (macOS)

1. Install [Homebrew](https://brew.sh), then the tools these configs use:

   ```sh
   brew install git stow neovim starship zoxide eza bat antidote \
     zsh-autosuggestions zsh-syntax-highlighting
   brew install --cask hyper font-geist-mono-nerd-font
   ```

2. Clone the repo:

   ```sh
   git clone https://github.com/Somdobomk/dotfiles.git ~/dotfiles
   ```

   To work from a fork, see [Fork.md](Fork.md).

3. Link the configs into place with [Stow](#gnu-stow):

   ```sh
   mkdir -p ~/.config
   cd ~/dotfiles && stow -t ~ home
   ```

4. Restart the shell with `exec zsh`.

## GNU Stow

[GNU Stow](https://www.gnu.org/software/stow/) creates the symlinks. Everything in [`home/`](home/) has the same path it would have in `$HOME`: `home/.config/nvim` becomes `~/.config/nvim`, and `home/.hyper.js` becomes `~/.hyper.js`. Run every command from `~/dotfiles`:

| Command | What it does |
| --- | --- |
| `stow -t ~ home` | Create the links |
| `stow -n -v -t ~ home` | Dry run: show what would be linked without changing anything |
| `stow -R -t ~ home` | Re-link: run after adding or removing files in `home/` |
| `stow -D -t ~ home` | Remove every link Stow created. Repo files are untouched |

**Adding a new config:** move it into `home/` at the same path it has in `$HOME`, then re-link. For example:

```sh
mv ~/.config/ghostty ~/dotfiles/home/.config/ghostty
cd ~/dotfiles && stow -R -t ~ home
```

**Conflicts:** Stow never overwrites. If a real file already exists where a link should go, Stow stops with `existing target is not owned by stow`. Back up or remove that file, then run the command again.

**How folders are linked:** if a folder doesn't exist in `$HOME` yet, Stow links the whole folder. `~/.config/nvim`, for example, is one link to `home/.config/nvim`, so files that apps create inside it end up in the repo. Folders that already exist, like `~/.config`, stay real folders, and Stow links the items inside them.

[`home/.stow-local-ignore`](home/.stow-local-ignore) lists files Stow skips, such as `.DS_Store`.

## What's included

- **Shell:** Zsh with Antidote plugins (autosuggestions, syntax highlighting, completions), [zoxide](https://github.com/ajeetdsouza/zoxide), and [eza](https://github.com/eza-community/eza)/[bat](https://github.com/sharkdp/bat) aliases for `ls`/`cat`
- **Prompt:** [Starship](https://starship.rs)
- **Editor:** Neovim with lazy.nvim, Treesitter, blink.cmp, and Gruvbox ([details](home/.config/nvim/README.md))
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
