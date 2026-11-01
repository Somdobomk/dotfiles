# Dotfiles

My personal macOS configuration, plus a matching PowerShell setup for [Windows](#windows).

## Contents

The repo is split by system:

```
dotfiles/
├── shared/      Used on both macOS and Windows
│   ├── home/    Mirrors $HOME: git, nvim, nushell, starship, television, wezterm, zed
│   ├── obsidian/  zen/  fonts/  wallpapers/
├── macos/       macOS only
│   ├── home/    Mirrors $HOME: zsh, .zshenv, .hushlogin
│   └── install.sh  Brewfile  defaults.sh
└── windows/     Windows only: PowerShell profile, Windows Terminal, PowerToys, winget, install.ps1
```

Both `home/` folders are linked into place with [GNU Stow](#gnu-stow).

| Path                                                       | What it is                                                                   | Links to                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------- |
| [`macos/home/.zshenv`](macos/home/.zshenv)                             | Points zsh at `~/.config/zsh`                                                | `~/.zshenv`               |
| [`macos/home/.hushlogin`](macos/home/.hushlogin)                       | Empty file that hides the "Last login" line in new terminals                 | `~/.hushlogin`            |
| [`macos/home/.config/zsh/`](macos/home/.config/zsh/)                   | Zsh config and [Antidote](https://antidote.sh) plugin list                   | `~/.config/zsh`           |
| [`shared/home/.config/nvim/`](shared/home/.config/nvim/)                 | Lightweight Neovim quick-edit setup ([details](shared/home/.config/nvim/README.md)) | `~/.config/nvim`          |
| [`shared/home/.config/nushell/`](shared/home/.config/nushell/)         | [Nushell](https://www.nushell.sh) config, the default shell in WezTerm on macOS ([details](#nushell)) | `~/.config/nushell`       |
| [`shared/home/.config/zed/`](shared/home/.config/zed/)                   | [Zed](https://zed.dev) editor settings                                       | `~/.config/zed`           |
| [`shared/home/.config/git/`](shared/home/.config/git/)                   | Git settings and global ignore list. The email is set per computer ([details](#git-email)) | `~/.config/git`           |
| [`shared/home/.config/starship.toml`](shared/home/.config/starship.toml) | [Starship](https://starship.rs) prompt                                       | `~/.config/starship.toml` |
| [`shared/home/.config/wezterm/`](shared/home/.config/wezterm/)           | [WezTerm](https://wezterm.org) terminal config with the Gruvbox colors        | `~/.config/wezterm`       |
| [`shared/home/.config/television/`](shared/home/.config/television/)     | [Television](https://github.com/alexpasmantier/television) fuzzy finder config, Gruvbox theme, and zoxide channel | `~/.config/television` |
| [`macos/install.sh`](macos/install.sh)                                 | macOS setup script ([details](#quick-start-macos))                           | —                         |
| [`macos/Brewfile`](macos/Brewfile)                                     | Homebrew tools, apps, and fonts, for `brew bundle`                           | —                         |
| [`macos/defaults.sh`](macos/defaults.sh)                   | macOS settings: key repeat, Finder, Dock ([details](#macos-settings))        | —                         |
| [`.editorconfig`](.editorconfig)                           | Indentation for this repo, so every editor saves files the same way          | —                         |
| [`windows/`](windows/)                                     | PowerShell profile, Windows Terminal settings, PowerToys backup, and install script | see [Windows](#windows) |
| [`shared/obsidian/`](shared/obsidian/) | [Obsidian](https://obsidian.md) settings, Gruvbox theme, and CSS snippets for the second-brain notes | `~/GitHub/second-brain/.obsidian` |
| [`shared/zen/`](shared/zen/)                                             | [Zen Browser](https://zen-browser.app) mods, mod settings, and shortcuts     | copied, see [Zen Browser](#zen-browser) |
| [`shared/fonts/`](shared/fonts/)                                         | Fonts not in Homebrew, and [install script](shared/fonts/install.sh)                | `~/Library/Fonts`         |
| [`shared/wallpapers/`](shared/wallpapers/)                               | Gruvbox wallpapers                                                           | —                         |

## Quick start (macOS)

1. Install [Homebrew](https://brew.sh). It also installs Apple's command line tools, which include Git.

2. Clone the repo:

   ```sh
   git clone https://github.com/Somdobomk/dotfiles.git ~/GitHub/dotfiles
   ```

   To work from a fork, see [Fork.md](Fork.md).

3. Run the install script:

   ```sh
   ~/GitHub/dotfiles/macos/install.sh
   ```

   It installs everything in the [`macos/Brewfile`](macos/Brewfile), links the configs into place with [Stow](#gnu-stow), asks for your [Git email](#git-email), and installs the [fonts](#fonts) that aren't in Homebrew. It's safe to run again. If Stow stops with `existing target is not owned by stow`, see [Conflicts](#gnu-stow).

4. Optionally, apply the [macOS settings](#macos-settings) with `~/GitHub/dotfiles/macos/defaults.sh`.

5. Restart the shell with `exec zsh`.

After installing or removing Homebrew apps, save the list with `macos/install.sh --save-apps`, then commit. This rewrites the `Brewfile` from what's installed, so its comments are dropped.

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

### Nushell

[Nushell](https://www.nushell.sh) is the default shell in WezTerm on macOS, configured in [`shared/home/.config/nushell/`](shared/home/.config/nushell/) to match the zsh setup: the same Starship prompt, zoxide, Television, aliases, and `EDITOR`. Zsh is still the login shell and everything in [`macos/home/.config/zsh/`](macos/home/.config/zsh/) is unchanged, so it works as a backup.

| Shortcut | What it does |
| --- | --- |
| `Cmd+Shift+Z` | Open a zsh tab in WezTerm |
| `zsh` | Switch to zsh inside the current tab. `exit` returns to Nushell |

**Go back to zsh:** delete the `default_prog` block near the top of [`wezterm.lua`](shared/home/.config/wezterm/wezterm.lua), or uninstall Nushell with `brew uninstall nushell`. WezTerm falls back to zsh if Nushell or its config is missing. Remove [`shared/home/.config/nushell/`](shared/home/.config/nushell/) and the `nushell` line in the Brewfile to clean up fully.

Only WezTerm starts Nushell. Other terminals, Zed's terminal, and `ssh` still use zsh, since the login shell is unchanged. To make Nushell the login shell everywhere, add `/opt/homebrew/bin/nu` to `/etc/shells` and run `chsh -s /opt/homebrew/bin/nu`. Zsh no longer reads its config files then, and programs that expect a POSIX shell can misbehave, so I'd keep the WezTerm-only setup.

Nushell on macOS looks in `~/Library/Application Support/nushell`, so WezTerm starts it with `--config ~/.config/nushell/config.nu --env-config ~/.config/nushell/env.nu`. Do the same when running `nu` by hand, or set `XDG_CONFIG_HOME=~/.config`.

What differs from zsh: no Antidote plugins (highlighting, suggestions, and completions are built in), no leading-space history trick, no `~icloud` path, and Nushell's own `ls`, `find`, and `du` stay as they are, since they return tables. Run `eza`, `fd`, or `dust` by name instead. Commands that only exist on one system live in [`macos.nu`](shared/home/.config/nushell/macos.nu) and [`windows.nu`](shared/home/.config/nushell/windows.nu).

### Neovim

Full list in the [Neovim README](shared/home/.config/nvim/README.md#basic-commands).

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
| `Cmd+E` | List the open tabs, like the buffer list. Pick one with the arrows or number keys and `Enter` |
| `Cmd+T` / `Cmd+Shift+[` / `Cmd+Shift+]` | New tab / previous tab / next tab |
| `Cmd+1` to `Cmd+9` | Go to that tab |
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

### Command palette

| App | Shortcut |
| --- | --- |
| Zed | `Cmd+Shift+P` |
| WezTerm | `Cmd+Shift+P` |
| Obsidian | `Cmd+Shift+P` (set in [`shared/obsidian/hotkeys.json`](shared/obsidian/hotkeys.json); `Cmd+O` is the quick switcher) |
| Neovim | `Space P` for Television's channel list, or `:` for commands. `Cmd+Shift+P` can't reach Neovim, because WezTerm uses it |
| Zen | `Cmd+T` opens the new-tab search, which also works as its command palette. Zen has no `Cmd+Shift+P` palette, and Firefox uses that shortcut for a private window |

### Dotfiles

Run from `~/GitHub/dotfiles`.

| Command | What it does |
| --- | --- |
| `macos/install.sh` | Set up or update this Mac from the repo ([more](#quick-start-macos)) |
| `macos/install.sh --save-apps` | Save the list of Homebrew apps to the `Brewfile` |
| `macos/defaults.sh` | Apply the [macOS settings](#macos-settings) |
| `macos/install.sh` | Re-link after adding or removing files in `shared/home/` or `macos/home/` ([more](#gnu-stow)) |
| `shared/zen/export.sh` | Save Zen mods and shortcuts into the repo ([more](#zen-browser)) |
| `shared/fonts/install.sh` | Install the fonts that aren't in Homebrew ([more](#fonts)) |
| `brewup` | Update Homebrew tools, apps, and fonts, then clean up old versions |
| `macosstore` | Update Mac App Store apps (mas) |
| `macosup` | Check for macOS updates. Install them with `sudo softwareupdate --install --all` |
| `windows\install.ps1` | Windows: set up or update this PC from the repo ([more](#windows)) |
| `windows\install.ps1 -SaveTerminal` | Windows: save Windows Terminal's settings into the repo |
| `windows\install.ps1 -SaveApps` | Windows: save the list of installed apps to `windows\winget.json` |

## GNU Stow

[GNU Stow](https://www.gnu.org/software/stow/) creates the symlinks. Each of [`shared/home/`](shared/home/) (both systems) and [`macos/home/`](macos/home/) (macOS only) has the same paths it would have in `$HOME`: `shared/home/.config/nvim` becomes `~/.config/nvim`, and `macos/home/.zshenv` becomes `~/.zshenv`. Run every command from `~/GitHub/dotfiles`:

| Command | What it does |
| --- | --- |
| `stow -d shared -t ~ home` and `stow -d macos -t ~ home` | Create the links, one command per folder |
| `stow -n -v -d shared -t ~ home` | Dry run: show what would be linked without changing anything |
| `stow -R -d shared -t ~ home` | Re-link: run after adding or removing files in `shared/home/` |
| `stow -D -d shared -t ~ home` | Remove every link Stow created from that folder. Repo files are untouched |

`macos/install.sh` runs the re-link for both folders.

**Adding a new config:** move it into `shared/home/` (or `macos/home/` if it only applies to macOS) at the same path it has in `$HOME`, then re-link. For example:

```sh
mv ~/.config/wezterm ~/GitHub/dotfiles/shared/home/.config/wezterm
cd ~/GitHub/dotfiles && stow -R -d shared -t ~ home
```

**Conflicts:** Stow never overwrites. If a real file already exists where a link should go, Stow stops with `existing target is not owned by stow`. Back up or remove that file, then run the command again.

**How folders are linked:** if a folder doesn't exist in `$HOME` yet, Stow links the whole folder. `~/.config/nvim`, for example, is one link to `shared/home/.config/nvim`, so files that apps create inside it end up in the repo. Folders that already exist, like `~/.config`, stay real folders, and Stow links the items inside them.

The `.stow-local-ignore` file in each `home/` folder lists files Stow skips, such as `.DS_Store`.

## What's included

- **Shell:** Zsh with plugins (autosuggestions, syntax highlighting, completions) managed by Antidote: add them to [`.zsh_plugins.txt`](macos/home/.config/zsh/.zsh_plugins.txt), not Homebrew. Also [zoxide](https://github.com/ajeetdsouza/zoxide) as `cd`, [Television](https://github.com/alexpasmantier/television) for `Ctrl+R` history search and `Ctrl+T` pickers, and aliases that swap in [eza](https://github.com/eza-community/eza) for `ls`, [bat](https://github.com/sharkdp/bat) for `cat`, [ripgrep](https://github.com/BurntSushi/ripgrep) for `grep`, [fd](https://github.com/sharkdp/fd) for `find`, and [dust](https://github.com/bootandy/dust) for `du`
- **Prompt:** [Starship](https://starship.rs)
- **Editor:** Neovim with lazy.nvim, Treesitter, blink.cmp, and Gruvbox Dark ([details](shared/home/.config/nvim/README.md))
- **Terminal:** WezTerm with Gruvbox Dark colors and GeistMono Nerd Font
- **Browser:** Zen with mods, mod settings, and keyboard shortcuts in [`shared/zen/`](shared/zen/)
- **Windows:** PowerShell 7 and Windows Terminal set up to match, sharing the Starship, Neovim, and Television configs ([details](#windows))

## Windows

[`windows/`](windows/) sets up the same shell on Windows with PowerShell 7 and Windows Terminal. The Starship, Neovim, Television, WezTerm, Zed, and Git configs in [`shared/home/`](shared/home/), and the Obsidian settings in [`shared/obsidian/`](shared/obsidian/), are used directly, so changes to them apply to both systems.

| Path | What it is |
| --- | --- |
| [`windows/powershell/Microsoft.PowerShell_profile.ps1`](windows/powershell/Microsoft.PowerShell_profile.ps1) | PowerShell profile, mirroring [`.zshrc`](macos/home/.config/zsh/.zshrc) |
| [`windows/terminal/settings.json`](windows/terminal/settings.json) | Windows Terminal: Gruvbox Dark, GeistMono Nerd Font, and a separate admin profile |
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
   ```

   Also install GeistMono Nerd Font from [nerdfonts.com](https://www.nerdfonts.com/font-downloads), then the repo's fonts with `F:\GitHub\dotfiles\shared\fonts\install.ps1`.

4. Close Zed and Obsidian, run the install script, then open a new tab:

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
| Neovim | `%LOCALAPPDATA%\nvim` becomes a junction to `shared/home/.config/nvim`. Junctions need no admin rights and work across drives |
| WezTerm | `~\.config\wezterm` becomes a junction to `shared/home/.config/wezterm` |
| Nushell | `~\.config\nushell` becomes a junction to `shared/home/.config/nushell` |
| Zed | `%APPDATA%\Zed` becomes a junction to `shared/home/.config/zed`. Skipped while Zed is open |
| Obsidian | `second-brain\.obsidian` becomes a junction to `shared/obsidian/`, if the [second-brain](https://github.com/Somdobomk/second-brain) notes are cloned next to the dotfiles repo. Skipped while Obsidian is open |
| Git | `~\.config\git` becomes a junction to `shared/home/.config/git`. Your email moves from `~\.gitconfig` to `~\.config\git\local`, then `~\.gitconfig` is moved aside, since it would override the shared config |
| Television | `shared/home/.config/television` is copied to `%LOCALAPPDATA%\television\config`, and the standard channels are downloaded |
| Starship | Nothing to copy: the profile points `STARSHIP_CONFIG` at `shared/home/.config/starship.toml` |

Anything replaced is first renamed to `<name>.bak-<date>`. The script is safe to run again, and it lists any tools that are still missing.

After changing Windows Terminal's settings in its Settings screen, save them into the repo with `windows\install.ps1 -SaveTerminal`, then commit. After installing or removing apps, update the app list with `windows\install.ps1 -SaveApps`, then commit.

### Git email

[`shared/home/.config/git/config`](shared/home/.config/git/config) has no email, so the real address stays out of this public repo. Each computer sets it in `~/.config/git/local`, which is gitignored:

```sh
git config --file ~/.config/git/local user.email you@example.com
```

On macOS, the install script asks for it. On Windows, it's taken from `~\.gitconfig` when that has an email. Until it's set, Git refuses to commit (`useConfigOnly`) instead of guessing an address from the computer's name. Check with `git config user.email`.

The config also turns on a few settings most people end up wanting: the first `git push` of a branch sets its upstream, `git pull` rebases instead of merging, remote branches deleted on the server are pruned, conflict resolutions are remembered (`rerere`), conflicts also show the original text (`zdiff3`), and `git branch` lists recent branches first. Each one is explained in the file.

### Nushell on Windows

[`shared/home/.config/nushell/`](shared/home/.config/nushell/) works on Windows too, but I haven't tested it there. PowerShell 7 stays the default in WezTerm until you switch. To try Nushell:

1. Install it and open a new PowerShell window:

   ```powershell
   winget install Nushell.Nushell
   ```

2. Try it with the repo config. `install.ps1` links `~\.config\nushell` to the repo, so run it again if that folder is missing:

   ```powershell
   nu --config ~\.config\nushell\config.nu --env-config ~\.config\nushell\env.nu
   ```

3. To make it the WezTerm default, replace the `default_prog` line for Windows in [`wezterm.lua`](shared/home/.config/wezterm/wezterm.lua) with:

   ```lua
   config.default_prog = { "nu.exe", "--config", wezterm.home_dir .. "/.config/nushell/config.nu", "--env-config", wezterm.home_dir .. "/.config/nushell/env.nu" }
   ```

   `Ctrl+Shift+Alt+Z` still opens a PowerShell tab.

The Starship, zoxide, and Television tools need to be installed, which `install.ps1` already reports. `windows.nu` adds `wingetup`; the macOS-only commands (`brewup`, `icloud`) don't load there.

### Differences from macOS

The [shell cheat sheet](#shell) works the same on Windows, with these differences:

| On Windows | Instead of |
| --- | --- |
| `ls` and `dir` run eza, same as macOS. `Get-ChildItem` is PowerShell's own, for piping files as objects | — |
| `la` lists everything, same as `lsa` | — |
| `Get-Content`, `findstr`, `find.exe` | `\grep`, `command find` to run the originals |
| `Tab` shows a menu of every match, with completions for winget, rg, fd, and tv | zsh completion menu |
| `wingetup` | `brewup`: update winget apps (PowerShell and winget included) |
| `powershellup` updates PowerShell modules installed from the PowerShell Gallery | — |
| `winosup` | `macosup`: check for Windows updates. Install them from Settings > Windows Update |

WezTerm uses the same config on Windows and starts PowerShell 7. Its [shortcuts](#wezterm) use `Ctrl+Shift` in place of `Cmd`, and `Ctrl+Shift+Alt` in place of `Cmd+Shift`: `Ctrl+Shift+D` splits side by side. Windows can't make WezTerm its default terminal, because that setting only accepts Windows Terminal. Pin WezTerm to the taskbar instead, or use **Open WezTerm here** in Explorer's right-click menu.

Typing a folder name alone to `cd` into it, and `icloud`, are macOS only. As on macOS, commands with a leading space stay out of history. PowerShell also keeps lines that look like they contain a password out of the history file.

### Neovim on Windows

Treesitter needs Neovim 0.12 or later, the tree-sitter CLI, and a C compiler. Windows has no compiler by default, so [`treesitter.lua`](shared/home/.config/nvim/lua/plugins/treesitter.lua) builds parsers with Zig on Windows. If a parser fails with `Lock file ... appears stale`, a build was interrupted: delete that file from `%LOCALAPPDATA%\tree-sitter\lock` and run `:TSUpdate` again.

### PowerToys

Restore the backup in **PowerToys Settings → General → Backup & restore**. To keep it current, set the backup location there to `windows\powertoys` in the repo and commit new backups. The backup includes computer names from Mouse Without Borders.

## Zen Browser

[`shared/zen/`](shared/zen/) holds Zen's customizations, so they can be set up on another computer, including Windows:

| File | What it holds |
| --- | --- |
| `zen-themes.json`, `chrome/` | Installed mods and their CSS |
| `chrome/userChrome.css`, `user.js` | Gruvbox orange accent color, and the setting that turns on `userChrome.css` |
| `mod-prefs.js` | Mod settings, taken from `prefs.js` |
| `zen-keyboard-shortcuts.json` | Keyboard shortcuts |
| `containers.json` | Container tabs |

Bookmarks, history, passwords, and extensions aren't here. Sign in to Sync (**Settings → Sync**) with the same Mozilla account to bring those over. Login files like `signedInUser.json` are never exported.

Zen replaces files when it saves them, which would break symlinks, so this folder is copied rather than linked with Stow.

### Save changes (macOS)

Run this after changing mods, mod settings, or shortcuts, then commit:

```sh
~/GitHub/dotfiles/shared/zen/export.sh
```

The script uses the Zen profile that changed most recently. To choose one, pass its folder name, for example `./export.sh "rhlik1qw.Default (alpha)"`. Profile folders are listed at `about:profiles`.

### Pages show gray or dark gaps

The Transparent Zen mod sets `browser.tabs.allow_transparent_browser`, which lets the window color show through any page with no background of its own. The mod is removed from this repo, and `user.js` turns the setting off. On a profile that still has the mod (macOS before the next export), remove it in **Zen Settings → Mods**, then copy `user.js` into the profile folder (`about:support` → Profile Folder) and restart Zen.

### Set up on Windows

1. Install Zen, open it once so it creates a profile, then **close it**.
2. Clone the repo (see [Quick start (Windows)](#quick-start-windows)) and run the import script in PowerShell:

   ```powershell
   powershell -ExecutionPolicy Bypass -File F:\GitHub\dotfiles\shared\zen\import.ps1
   ```

   To choose a profile, add `-Profile "<folder name>"`.
3. Start Zen and sign in to Sync.

The custom UI font is DankMono Nerd Font, the same as Zed and Obsidian. It's a paid font, so it comes from the private [fonts repo](#fonts) rather than Homebrew. Install it on Windows too, or pick another font in the mod's settings.

## Fonts

### Open-source fonts (Homebrew)

Open-source fonts are installed with Homebrew from the [`macos/Brewfile`](macos/Brewfile), so `brew upgrade` keeps them current. All Nerd Fonts are version 3, which the icons in Starship, eza, and Neovim need. To add a font, put a `cask "font-..."` line in the `Brewfile` and run `brew bundle` from `~/GitHub/dotfiles`.

Some Nerd Fonts use a different name than the original font: Source Code Pro is **SauceCodePro**, Terminus is **Terminess**, and Cascadia Code is **CaskaydiaCove**. In app settings, use the full family name, such as `GeistMono Nerd Font Mono`. List the installed names with `wezterm ls-fonts --list-system`.

### Other fonts

[`shared/fonts/`](shared/fonts/) holds fonts that aren't in Homebrew. Copy them to `~/Library/Fonts` with:

```sh
~/GitHub/dotfiles/shared/fonts/install.sh -n   # dry run: list what would be installed
~/GitHub/dotfiles/shared/fonts/install.sh      # install
```

On Windows, [`shared/fonts/install.ps1`](shared/fonts/install.ps1) does the same for the current user, without admin rights: `shared\fonts\install.ps1 -DryRun`, then `shared\fonts\install.ps1`. Restart open apps to see the new fonts.

When a font ships as both `.otf` and `.ttf`, the `.otf` is used. Web formats are skipped. Fonts that are already installed are never overwritten, so the script is safe to run again.

### Paid fonts

Paid fonts aren't in this repo because their licenses don't allow redistribution. They live in a separate private repo that's cloned into `shared/fonts/private/`. That folder is gitignored, and the install script picks it up automatically when it exists:

```sh
git clone git@github.com:Somdobomk/dotfiles-fonts.git ~/GitHub/dotfiles/shared/fonts/private
~/GitHub/dotfiles/shared/fonts/install.sh
```

Without access to the private repo, skip the clone. The script installs only the free fonts.

### Favorites

- [Geist Mono](https://vercel.com/font): terminals and editors
- [Iosevka](https://typeof.net/Iosevka/)
- [Victor Mono](https://rubjo.github.io/victor-mono/): cursive italics
- [Dank Mono](https://philpl.gumroad.com/l/dank-mono) (paid)
- [Skribble Mono](https://www.skribble.dev/) (paid)
