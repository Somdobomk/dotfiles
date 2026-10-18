# Dotfiles

My personal macOS configuration, plus a matching PowerShell setup for [Windows](#windows).

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
| [`home/.config/wezterm/`](home/.config/wezterm/)           | [WezTerm](https://wezterm.org) terminal config with the Everforest colors     | `~/.config/wezterm`       |
| [`home/.config/television/`](home/.config/television/)     | [Television](https://github.com/alexpasmantier/television) fuzzy finder config, Everforest theme, and zoxide channel | `~/.config/television` |
| [`windows/`](windows/)                                     | PowerShell profile, Windows Terminal settings, PowerToys backup, and install script | see [Windows](#windows) |
| [`zen/`](zen/)                                             | [Zen Browser](https://zen-browser.app) mods, mod settings, and shortcuts     | copied, see [Zen Browser](#zen-browser) |
| [`fonts/`](fonts/)                                         | Fonts not in Homebrew, and [install script](fonts/install.sh)                | `~/Library/Fonts`         |
| [`wallpapers/`](wallpapers/)                               | Gruvbox wallpapers                                                           | —                         |

## Quick start (macOS)

1. Install [Homebrew](https://brew.sh), then the tools these configs use:

   ```sh
   brew install git stow neovim tree-sitter-cli starship zoxide television fd ripgrep dust eza bat antidote
   brew install --cask wezterm font-geist-mono-nerd-font
   ```

   That covers the terminal's font. The full font list is under [Fonts](#fonts).

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

## Cheat sheet

Shortcuts set up by these dotfiles, plus a few built-in ones that are easy to forget.

### Shell

| Shortcut | What it does |
| --- | --- |
| `cd foo` | Jump to the most-used folder matching "foo" (zoxide). Normal paths still work |
| `foo` | Type just a folder name to `cd` into it |
| `↑` / `↓` | Step through earlier commands that start with what's already typed |
| `cdi` | Pick a folder you've visited before (Television) |
| `Ctrl+R` | Search all history (Television) |
| `Ctrl+T` | Pick something for the command being typed and insert it: files by default, folders after `cd`, branches after `git checkout`, and so on (Television) |
| `tv` / `tv text` | Find files / search text in files. `tv` alone, then `Ctrl+T`, lists every channel |
| ` command` | A leading space keeps the command out of history |
| `ls` / `lsa` | List files with icons / including hidden ones (eza) |
| `ll` / `lla` | Long listing / including hidden ones |
| `cat file` | Print with syntax highlighting (bat) |
| `grep foo` | Search file contents in the current folder and below (ripgrep). Skips hidden and gitignored files |
| `find foo` | Find files and folders whose name matches "foo" (fd). Skips hidden and gitignored files; add `-H` for hidden |
| `du` | Show which folders take the most space (dust) |
| `\grep`, `command find` | Run the original command instead of the replacement |
| `icloud` | Go to iCloud Drive. In paths, use `~icloud`: `cd ~icloud/Downloads` |
| `notes` | Open `~/notes` in Zed |
| `notes-sync` | Commit, pull, and push `~/notes` |

### Neovim

Full list in the [Neovim README](home/.config/nvim/README.md#basic-commands).

| Shortcut | What it does |
| --- | --- |
| `Space` | Show available shortcuts (which-key) |
| `Space w` / `Space q` | Save / quit |
| `Space f` | Format the buffer or selection |
| `Space p` / `Space /` | Find files / search text in files (Television) |
| `Tab` | Accept a completion suggestion |
| `:FormatToggle` | Format on save on or off |
| `:Lazy update` | Update plugins, then commit `lazy-lock.json` |
| `:TSUpdate` | Update Treesitter parsers |

### WezTerm

| Shortcut | What it does |
| --- | --- |
| `Cmd+,` | Open the config in Zed. Saving reloads it automatically |
| `Cmd+Shift+P` | Command palette: search every WezTerm action |
| `Cmd+T` / `Cmd+Shift+[` / `Cmd+Shift+]` | New tab / previous tab / next tab |
| `Cmd+D` / `Cmd+Shift+D` | Split side by side / split stacked |
| `Cmd+[` / `Cmd+]` | Previous split / next split |
| `Cmd+Shift+Enter` | Zoom the current split to full size and back |
| `Cmd+W` | Close the split, or the tab if it has none, without asking |

The left Option key acts as Alt, for shell shortcuts like `Alt+B` / `Alt+F` (jump back / forward a word); the right one types special characters.

### Zed

| Shortcut | What it does |
| --- | --- |
| `Cmd+P` | Open a file by name |
| `Cmd+Shift+F` | Search across the project |
| `Cmd+K V` | Markdown preview beside the file |

### Dotfiles

Run from `~/dotfiles`.

| Command | What it does |
| --- | --- |
| `stow -R -t ~ home` | Re-link after adding or removing files in `home/` ([more](#gnu-stow)) |
| `zen/export.sh` | Save Zen mods and shortcuts into the repo ([more](#zen-browser)) |
| `fonts/install.sh` | Install the fonts that aren't in Homebrew ([more](#fonts)) |
| `brew upgrade` | Update Homebrew tools, apps, and fonts |
| `windows\install.ps1` | Windows: set up or update this PC from the repo ([more](#windows)) |
| `windows\install.ps1 -SaveTerminal` | Windows: save Windows Terminal's settings into the repo |

## GNU Stow

[GNU Stow](https://www.gnu.org/software/stow/) creates the symlinks. Everything in [`home/`](home/) has the same path it would have in `$HOME`: `home/.config/nvim` becomes `~/.config/nvim`, and `home/.zshenv` becomes `~/.zshenv`. Run every command from `~/dotfiles`:

| Command | What it does |
| --- | --- |
| `stow -t ~ home` | Create the links |
| `stow -n -v -t ~ home` | Dry run: show what would be linked without changing anything |
| `stow -R -t ~ home` | Re-link: run after adding or removing files in `home/` |
| `stow -D -t ~ home` | Remove every link Stow created. Repo files are untouched |

**Adding a new config:** move it into `home/` at the same path it has in `$HOME`, then re-link. For example:

```sh
mv ~/.config/wezterm ~/dotfiles/home/.config/wezterm
cd ~/dotfiles && stow -R -t ~ home
```

**Conflicts:** Stow never overwrites. If a real file already exists where a link should go, Stow stops with `existing target is not owned by stow`. Back up or remove that file, then run the command again.

**How folders are linked:** if a folder doesn't exist in `$HOME` yet, Stow links the whole folder. `~/.config/nvim`, for example, is one link to `home/.config/nvim`, so files that apps create inside it end up in the repo. Folders that already exist, like `~/.config`, stay real folders, and Stow links the items inside them.

[`home/.stow-local-ignore`](home/.stow-local-ignore) lists files Stow skips, such as `.DS_Store`.

## What's included

- **Shell:** Zsh with plugins (autosuggestions, syntax highlighting, completions) managed by Antidote: add them to [`.zsh_plugins.txt`](home/.config/zsh/.zsh_plugins.txt), not Homebrew. Also [zoxide](https://github.com/ajeetdsouza/zoxide) as `cd`, [Television](https://github.com/alexpasmantier/television) for `Ctrl+R` history search and `Ctrl+T` pickers, and aliases that swap in [eza](https://github.com/eza-community/eza) for `ls`, [bat](https://github.com/sharkdp/bat) for `cat`, [ripgrep](https://github.com/BurntSushi/ripgrep) for `grep`, [fd](https://github.com/sharkdp/fd) for `find`, and [dust](https://github.com/bootandy/dust) for `du`
- **Prompt:** [Starship](https://starship.rs)
- **Editor:** Neovim with lazy.nvim, Treesitter, blink.cmp, and Everforest Dark Hard ([details](home/.config/nvim/README.md))
- **Terminal:** WezTerm with Everforest Dark Hard colors and GeistMono Nerd Font
- **Browser:** Zen with mods, mod settings, and keyboard shortcuts in [`zen/`](zen/)
- **Windows:** PowerShell 7 and Windows Terminal set up to match, sharing the Starship, Neovim, and Television configs ([details](#windows))

## Windows

[`windows/`](windows/) sets up the same shell on Windows with PowerShell 7 and Windows Terminal. The Starship, Neovim, and Television configs in [`home/`](home/) are used directly, so changes to them apply to both systems.

| Path | What it is |
| --- | --- |
| [`windows/powershell/Microsoft.PowerShell_profile.ps1`](windows/powershell/Microsoft.PowerShell_profile.ps1) | PowerShell profile, mirroring [`.zshrc`](home/.config/zsh/.zshrc) |
| [`windows/terminal/settings.json`](windows/terminal/settings.json) | Windows Terminal: Everforest Dark Hard, GeistMono Nerd Font, and a separate admin profile |
| [`windows/powertoys/`](windows/powertoys/) | PowerToys settings backup |
| [`windows/install.ps1`](windows/install.ps1) | Setup script |

### Quick start (Windows)

1. Install the tools these configs use:

   ```powershell
   winget install Git.Git Microsoft.PowerShell Microsoft.WindowsTerminal Neovim.Neovim Starship.Starship ajeetdsouza.zoxide alexpasmantier.television sharkdp.bat eza-community.eza BurntSushi.ripgrep.MSVC sharkdp.fd bootandy.dust ZedIndustries.Zed wez.wezterm zig.zig tree-sitter.tree-sitter-cli
   Install-Module Terminal-Icons -Scope CurrentUser
   ```

   Also install GeistMono Nerd Font from [nerdfonts.com](https://www.nerdfonts.com/font-downloads). Windows Terminal and the Zen mods use it.

2. Clone the repo. Any folder works; this one keeps it out of OneDrive:

   ```powershell
   git clone https://github.com/Somdobomk/dotfiles.git F:\GitHub\dotfiles
   ```

3. Run the install script, then open a new tab:

   ```powershell
   F:\GitHub\dotfiles\windows\install.ps1
   ```

   If scripts are blocked, run `pwsh -ExecutionPolicy Bypass -File F:\GitHub\dotfiles\windows\install.ps1` instead.

### What the install script does

| Config | How it's set up |
| --- | --- |
| PowerShell | `$PROFILE` becomes a one-line file that loads the profile from the repo. This works even when OneDrive backs up Documents |
| Windows Terminal | `settings.json` is copied into place. It's a copy, not a link, because Terminal replaces links when it saves |
| Neovim | `%LOCALAPPDATA%\nvim` becomes a junction to `home/.config/nvim`. Junctions need no admin rights and work across drives |
| WezTerm | `~\.config\wezterm` becomes a junction to `home/.config/wezterm` |
| Television | `home/.config/television` is copied to `%LOCALAPPDATA%\television\config`, and the standard channels are downloaded |
| Starship | Nothing to copy: the profile points `STARSHIP_CONFIG` at `home/.config/starship.toml` |
| Notes | `Somdobomk/notes` is cloned next to the dotfiles repo |

Anything replaced is first renamed to `<name>.bak-<date>`. The script is safe to run again, and it lists any tools that are still missing.

After changing Windows Terminal's settings in its Settings screen, save them into the repo with `windows\install.ps1 -SaveTerminal`, then commit.

### Differences from macOS

The [shell cheat sheet](#shell) works the same on Windows, with these differences:

| On Windows | Instead of |
| --- | --- |
| `ls` is PowerShell's own, so its output can still be piped as objects. Icons come from Terminal-Icons | `ls` with eza |
| `la` lists everything, same as `lsa` | — |
| `Get-Content`, `findstr`, `find.exe` | `\grep`, `command find` to run the originals |
| `Tab` shows a menu of every match, with completions for winget, rg, fd, and tv | zsh completion menu |
| `Update-PowerShell`, `wingetup`, `winup` | `brew upgrade`: update PowerShell, winget apps, and PowerShell modules |

WezTerm uses the same config on Windows and starts PowerShell 7. Its [shortcuts](#wezterm) use `Ctrl+Shift` in place of `Cmd`, and `Ctrl+Shift+Alt` in place of `Cmd+Shift`: `Ctrl+Shift+D` splits side by side. Windows can't make WezTerm its default terminal, because that setting only accepts Windows Terminal. Pin WezTerm to the taskbar instead, or use **Open WezTerm here** in Explorer's right-click menu.

Typing a folder name alone to `cd` into it, and `icloud`, are macOS only. As on macOS, commands with a leading space stay out of history. PowerShell also keeps lines that look like they contain a password out of the history file.

### Neovim on Windows

Treesitter needs Neovim 0.12 or later, the tree-sitter CLI, and a C compiler. Windows has no compiler by default, so [`treesitter.lua`](home/.config/nvim/lua/plugins/treesitter.lua) builds parsers with Zig on Windows. If a parser fails with `Lock file ... appears stale`, a build was interrupted: delete that file from `%LOCALAPPDATA%\tree-sitter\lock` and run `:TSUpdate` again.

### PowerToys

Restore the backup in **PowerToys Settings → General → Backup & restore**. To keep it current, set the backup location there to `windows\powertoys` in the repo and commit new backups. The backup includes computer names from Mouse Without Borders.

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
2. Clone the repo (see [Quick start (Windows)](#quick-start-windows)) and run the import script in PowerShell:

   ```powershell
   powershell -ExecutionPolicy Bypass -File F:\GitHub\dotfiles\zen\import.ps1
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

Some Nerd Fonts use a different name than the original font: Source Code Pro is **SauceCodePro**, Terminus is **Terminess**, and Cascadia Code is **CaskaydiaCove**. In app settings, use the full family name, such as `GeistMono Nerd Font Mono`. List the installed names with `wezterm ls-fonts --list-system`.

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
