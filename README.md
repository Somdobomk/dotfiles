# Dotfiles

My personal macOS configuration.

## Contents

[`home/`](home/) mirrors `$HOME` and is linked into place with [GNU Stow](#gnu-stow).

| Path                                                       | What it is                                                                   | Links to                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------- |
| [`home/.zshenv`](home/.zshenv)                             | Points zsh at `~/.config/zsh`                                                | `~/.zshenv`               |
| [`home/.hushlogin`](home/.hushlogin)                       | Empty file that hides the "Last login" line in new terminals                 | `~/.hushlogin`            |
| [`home/.config/zsh/`](home/.config/zsh/)                   | Zsh config and [Antidote](https://antidote.sh) plugin list                   | `~/.config/zsh`           |
| [`home/.config/nvim/`](home/.config/nvim/)                 | Lightweight Neovim quick-edit setup ([details](home/.config/nvim/README.md)) | `~/.config/nvim`          |
| [`home/.config/zed/`](home/.config/zed/)                   | [Zed](https://zed.dev) editor settings                                       | `~/.config/zed`           |
| [`home/.config/git/`](home/.config/git/)                   | Git settings and global ignore list                                          | `~/.config/git`           |
| [`home/.config/starship.toml`](home/.config/starship.toml) | [Starship](https://starship.rs) prompt                                       | `~/.config/starship.toml` |
| [`home/.config/ghostty/`](home/.config/ghostty/)           | [Ghostty](https://ghostty.org) terminal config and Everforest theme          | `~/.config/ghostty`       |
| [`home/.hyper.js`](home/.hyper.js)                         | [Hyper](https://hyper.is) terminal config                                    | `~/.hyper.js`             |
| [`home/.hyper_plugins/`](home/.hyper_plugins/)             | Hyper plugin list                                                            | `~/.hyper_plugins`        |
| [`zen/`](zen/)                                             | [Zen Browser](https://zen-browser.app) mods, mod settings, and shortcuts     | copied, see [Zen Browser](#zen-browser) |
| [`fonts/`](fonts/)                                         | Fonts not in Homebrew, and [install script](fonts/install.sh)                | `~/Library/Fonts`         |
| [`wallpapers/`](wallpapers/)                               | Gruvbox wallpapers                                                           | —                         |

## Quick start (macOS)

1. Install [Homebrew](https://brew.sh), then the tools these configs use:

   ```sh
   brew install git stow neovim tree-sitter-cli starship zoxide fzf eza bat antidote \
     zsh-autosuggestions zsh-syntax-highlighting
   brew install --cask ghostty hyper font-geist-mono-nerd-font
   ```

   That covers the terminals' font. The full font list is under [Fonts](#fonts).

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

- **Shell:** Zsh with Antidote plugins (autosuggestions, syntax highlighting, completions), [zoxide](https://github.com/ajeetdsouza/zoxide) as `cd`, [fzf](https://github.com/junegunn/fzf) for `Ctrl+R` history search, and [eza](https://github.com/eza-community/eza)/[bat](https://github.com/sharkdp/bat) aliases for `ls`/`cat`
- **Prompt:** [Starship](https://starship.rs)
- **Editor:** Neovim with lazy.nvim, Treesitter, blink.cmp, and Everforest Dark Hard ([details](home/.config/nvim/README.md))
- **Terminal:** Ghostty and Hyper, both with Everforest Dark Hard colors and GeistMono Nerd Font
- **Browser:** Zen with mods, mod settings, and keyboard shortcuts in [`zen/`](zen/)

## Zen Browser

[`zen/`](zen/) holds Zen's customizations, so they can be set up on another computer, including Windows:

| File | What it holds |
| --- | --- |
| `zen-themes.json`, `chrome/` | Installed mods and their CSS |
| `mod-prefs.js` | Mod settings, taken from `prefs.js` |
| `zen-keyboard-shortcuts.json` | Keyboard shortcuts |
| `containers.json` | Container tabs |

Bookmarks, history, passwords, and extensions aren't here. Sign in to Sync (**Settings → Sync**) with the same Mozilla account to bring those over. Login files like `signedInUser.json` are never exported.

Zen replaces files when it saves them, which would break symlinks, so this folder is copied rather than linked with Stow.

### Save changes (macOS)

Run this after changing mods, mod settings, or shortcuts, then commit:

```sh
~/dotfiles/zen/export.sh
```

The script uses the Zen profile that changed most recently. To choose one, pass its folder name, for example `./export.sh "rhlik1qw.Default (alpha)"`. Profile folders are listed at `about:profiles`.

### Set up on Windows

1. Install Zen, open it once so it creates a profile, then **close it**.
2. Clone the repo and run the import script in PowerShell:

   ```powershell
   git clone https://github.com/Somdobomk/dotfiles.git $HOME\dotfiles
   powershell -ExecutionPolicy Bypass -File $HOME\dotfiles\zen\import.ps1
   ```

   To choose a profile, add `-Profile "<folder name>"`.
3. Start Zen and sign in to Sync.

The custom UI font is GeistMono Nerd Font Mono (`brew install --cask font-geist-mono-nerd-font` on macOS). Install it on Windows too, or pick another font in the mod's settings.

## Fonts

### Open-source fonts (Homebrew)

Open-source fonts are installed with Homebrew, so `brew upgrade` keeps them current. All Nerd Fonts are version 3, which the icons in Starship, eza, and Neovim need.

```sh
brew install --cask \
  font-geist-mono-nerd-font \
  font-iosevka-nerd-font font-iosevka-term-nerd-font \
  font-jetbrains-mono-nerd-font font-victor-mono-nerd-font \
  font-fira-code-nerd-font font-fira-mono-nerd-font \
  font-hack-nerd-font font-inconsolata-nerd-font \
  font-sauce-code-pro-nerd-font font-terminess-ttf-nerd-font \
  font-ubuntu-nerd-font
```

Some Nerd Fonts use a different name than the original font: Source Code Pro is **SauceCodePro**, Terminus is **Terminess**, and Cascadia Code is **CaskaydiaCove**. In app settings, use the full family name, such as `GeistMono Nerd Font Mono`. List the installed names with `ghostty +list-fonts`.

### Other fonts

[`fonts/`](fonts/) holds fonts that aren't in Homebrew. Copy them to `~/Library/Fonts` with:

```sh
~/dotfiles/fonts/install.sh -n   # dry run: list what would be installed
~/dotfiles/fonts/install.sh      # install
```

When a font ships as both `.otf` and `.ttf`, the `.otf` is used. Web formats are skipped. Fonts that are already installed are never overwritten, so the script is safe to run again.

### Paid fonts

Paid fonts aren't in this repo because their licenses don't allow redistribution. They live in a separate private repo that's cloned into `fonts/private/`. That folder is gitignored, and the install script picks it up automatically when it exists:

```sh
git clone git@github.com:Somdobomk/dotfiles-fonts.git ~/dotfiles/fonts/private
~/dotfiles/fonts/install.sh
```

Without access to the private repo, skip the clone. The script installs only the free fonts.

### Favorites

- [Geist Mono](https://vercel.com/font): terminals and editors
- [Iosevka](https://typeof.net/Iosevka/)
- [Victor Mono](https://rubjo.github.io/victor-mono/): cursive italics
- [Dank Mono](https://philpl.gumroad.com/l/dank-mono) (paid)
- [Skribble Mono](https://www.skribble.dev/) (paid)
