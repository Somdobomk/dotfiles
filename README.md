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
| [`home/.config/git/`](home/.config/git/)                   | Git settings and global ignore list. The email is set per computer ([details](#git-email)) | `~/.config/git`           |
| [`home/.config/starship.toml`](home/.config/starship.toml) | [Starship](https://starship.rs) prompt                                       | `~/.config/starship.toml` |
| [`home/.config/wezterm/`](home/.config/wezterm/)           | [WezTerm](https://wezterm.org) terminal config with the Everforest colors     | `~/.config/wezterm`       |
| [`home/.config/television/`](home/.config/television/)     | [Television](https://github.com/alexpasmantier/television) fuzzy finder config, Everforest theme, and zoxide channel | `~/.config/television` |
| [`install.sh`](install.sh)                                 | macOS setup script ([details](#quick-start-macos))                           | —                         |
| [`Brewfile`](Brewfile)                                     | Homebrew tools, apps, and fonts, for `brew bundle`                           | —                         |
| [`macos/defaults.sh`](macos/defaults.sh)                   | macOS settings: key repeat, Finder, Dock ([details](#macos-settings))        | —                         |
| [`.editorconfig`](.editorconfig)                           | Indentation for this repo, so every editor saves files the same way          | —                         |
| [`windows/`](windows/)                                     | PowerShell profile, Windows Terminal settings, PowerToys backup, and install script | see [Windows](#windows) |
| [`zen/`](zen/)                                             | [Zen Browser](https://zen-browser.app) mods, mod settings, and shortcuts     | copied, see [Zen Browser](#zen-browser) |
| [`fonts/`](fonts/)                                         | Fonts not in Homebrew, and [install script](fonts/install.sh)                | `~/Library/Fonts`         |
| [`wallpapers/`](wallpapers/)                               | Gruvbox wallpapers                                                           | —                         |

## Quick start (macOS)

1. Install [Homebrew](https://brew.sh). It also installs Apple's command line tools, which include Git.

2. Clone the repo:

   ```sh
   git clone https://github.com/Somdobomk/dotfiles.git ~/dotfiles
   ```

   To work from a fork, see [Fork.md](Fork.md).

3. Run the install script:

   ```sh
   ~/dotfiles/install.sh
   ```

   It installs everything in the [`Brewfile`](Brewfile), links the configs into place with [Stow](#gnu-stow), asks for your [Git email](#git-email), installs the [fonts](#fonts) that aren't in Homebrew, and clones `~/notes`. It's safe to run again. If Stow stops with `existing target is not owned by stow`, see [Conflicts](#gnu-stow).

4. Optionally, apply the [macOS settings](#macos-settings) with `~/dotfiles/macos/defaults.sh`.

5. Restart the shell with `exec zsh`.

After installing or removing Homebrew apps, save the list with `./install.sh --save-apps`, then commit. This rewrites the `Brewfile` from what's installed, so its comments are dropped.

### macOS settings

[`macos/defaults.sh`](macos/defaults.sh) changes settings that aren't stored in any config file: fast key repeat, no smart quotes or autocorrect, Finder showing hidden files and extensions in list view, an auto-hiding Dock without recent apps, and Spaces that stay in order. Read it first and delete any lines you don't want. The keyboard settings need a logout.

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
| `./install.sh` | Set up or update this Mac from the repo ([more](#quick-start-macos)) |
| `./install.sh --save-apps` | Save the list of Homebrew apps to the `Brewfile` |
| `macos/defaults.sh` | Apply the [macOS settings](#macos-settings) |
| `stow -R -t ~ home` | Re-link after adding or removing files in `home/` ([more](#gnu-stow)) |
| `zen/export.sh` | Save Zen mods and shortcuts into the repo ([more](#zen-browser)) |
| `fonts/install.sh` | Install the fonts that aren't in Homebrew ([more](#fonts)) |
| `brew upgrade` | Update Homebrew tools, apps, and fonts |
| `windows\install.ps1` | Windows: set up or update this PC from the repo ([more](#windows)) |
| `windows\install.ps1 -SaveTerminal` | Windows: save Windows Terminal's settings into the repo |
| `windows\install.ps1 -SaveApps` | Windows: save the list of installed apps to `windows\winget.json` |

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

[`windows/`](windows/) sets up the same shell on Windows with PowerShell 7 and Windows Terminal. The Starship, Neovim, Television, WezTerm, Zed, and Git configs in [`home/`](home/) are used directly, so changes to them apply to both systems.

| Path | What it is |
| --- | --- |
| [`windows/powershell/Microsoft.PowerShell_profile.ps1`](windows/powershell/Microsoft.PowerShell_profile.ps1) | PowerShell profile, mirroring [`.zshrc`](home/.config/zsh/.zshrc) |
| [`windows/terminal/settings.json`](windows/terminal/settings.json) | Windows Terminal: Everforest Dark Hard, GeistMono Nerd Font, and a separate admin profile |
| [`windows/winget.json`](windows/winget.json) | Every installed app winget can reinstall, for `winget import`. Runtimes like VCRedist and .NET are left out, since apps that need them pull them in |
| [`windows/powertoys/`](windows/powertoys/) | PowerToys settings backup |
| [`windows/install.ps1`](windows/install.ps1) | Setup script |

### Quick start (Windows)

Everything else comes back from this repo, GitHub, and OneDrive. Before reinstalling Windows, only back up `~\.ssh` (somewhere private, not OneDrive or GitHub), or skip it and add a new key afterwards with `gh ssh-key add`. A separate drive like `F:` keeps its files through a reinstall.

1. Install Git and the GitHub CLI, then sign in:

   ```powershell
   winget install Git.Git GitHub.cli
   gh auth login
   ```

2. Clone the repo. Any folder works; this one keeps it out of OneDrive:

   ```powershell
   git clone https://github.com/Somdobomk/dotfiles.git F:\GitHub\dotfiles
   ```

3. Reinstall every app from the saved list, including the tools these configs use:

   ```powershell
   winget import F:\GitHub\dotfiles\windows\winget.json --accept-package-agreements --accept-source-agreements
   Install-Module Terminal-Icons -Scope CurrentUser
   ```

   Also install GeistMono Nerd Font from [nerdfonts.com](https://www.nerdfonts.com/font-downloads), then the repo's fonts with `F:\GitHub\dotfiles\fonts\install.ps1`.

4. Close Zed, run the install script, then open a new tab:

   ```powershell
   F:\GitHub\dotfiles\windows\install.ps1
   ```

   If scripts are blocked, run `pwsh -ExecutionPolicy Bypass -File F:\GitHub\dotfiles\windows\install.ps1` instead.

5. Set your Git email (see [Git email](#git-email)), import [Zen](#set-up-on-windows), and restore [PowerToys](#powertoys).

### What the install script does

| Config | How it's set up |
| --- | --- |
| PowerShell | `$PROFILE` becomes a one-line file that loads the profile from the repo. This works even when OneDrive backs up Documents |
| Windows Terminal | `settings.json` is copied into place. It's a copy, not a link, because Terminal replaces links when it saves |
| Neovim | `%LOCALAPPDATA%\nvim` becomes a junction to `home/.config/nvim`. Junctions need no admin rights and work across drives |
| WezTerm | `~\.config\wezterm` becomes a junction to `home/.config/wezterm` |
| Zed | `%APPDATA%\Zed` becomes a junction to `home/.config/zed`. Skipped while Zed is open |
| Git | `~\.config\git` becomes a junction to `home/.config/git`. Your email moves from `~\.gitconfig` to `~\.config\git\local`, then `~\.gitconfig` is moved aside, since it would override the shared config |
| Television | `home/.config/television` is copied to `%LOCALAPPDATA%\television\config`, and the standard channels are downloaded |
| Starship | Nothing to copy: the profile points `STARSHIP_CONFIG` at `home/.config/starship.toml` |
| Notes | `Somdobomk/notes` is cloned next to the dotfiles repo |

Anything replaced is first renamed to `<name>.bak-<date>`. The script is safe to run again, and it lists any tools that are still missing.

After changing Windows Terminal's settings in its Settings screen, save them into the repo with `windows\install.ps1 -SaveTerminal`, then commit. After installing or removing apps, update the app list with `windows\install.ps1 -SaveApps`, then commit.

### Git email

[`home/.config/git/config`](home/.config/git/config) has no email, so the real address stays out of this public repo. Each computer sets it in `~/.config/git/local`, which is gitignored:

```sh
git config --file ~/.config/git/local user.email you@example.com
```

On macOS, the install script asks for it. On Windows, it's taken from `~\.gitconfig` when that has an email. Until it's set, Git refuses to commit (`useConfigOnly`) instead of guessing an address from the computer's name. Check with `git config user.email`.

The config also turns on a few settings most people end up wanting: the first `git push` of a branch sets its upstream, `git pull` rebases instead of merging, remote branches deleted on the server are pruned, conflict resolutions are remembered (`rerere`), conflicts also show the original text (`zdiff3`), and `git branch` lists recent branches first. Each one is explained in the file.

### Differences from macOS

The [shell cheat sheet](#shell) works the same on Windows, with these differences:

| On Windows | Instead of |
| --- | --- |
| `ls` is PowerShell's own, so its output can still be piped as objects. Icons come from Terminal-Icons | `ls` with eza |
| `la` lists everything, same as `lsa` | — |
| `Get-Content`, `findstr`, `find.exe` | `\grep`, `command find` to run the originals |
| `Tab` shows a menu of every match, with completions for winget, rg, fd, and tv | zsh completion menu |
| `wingetup`, `winup` | `brew upgrade`: update winget apps (PowerShell included) and PowerShell modules |

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

Open-source fonts are installed with Homebrew from the [`Brewfile`](Brewfile), so `brew upgrade` keeps them current. All Nerd Fonts are version 3, which the icons in Starship, eza, and Neovim need. To add a font, put a `cask "font-..."` line in the `Brewfile` and run `brew bundle` from `~/dotfiles`.

Some Nerd Fonts use a different name than the original font: Source Code Pro is **SauceCodePro**, Terminus is **Terminess**, and Cascadia Code is **CaskaydiaCove**. In app settings, use the full family name, such as `GeistMono Nerd Font Mono`. List the installed names with `wezterm ls-fonts --list-system`.

### Other fonts

[`fonts/`](fonts/) holds fonts that aren't in Homebrew. Copy them to `~/Library/Fonts` with:

```sh
~/dotfiles/fonts/install.sh -n   # dry run: list what would be installed
~/dotfiles/fonts/install.sh      # install
```

On Windows, [`fonts/install.ps1`](fonts/install.ps1) does the same for the current user, without admin rights: `fonts\install.ps1 -DryRun`, then `fonts\install.ps1`. Restart open apps to see the new fonts.

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
