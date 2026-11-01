#!/usr/bin/env zsh
# Set up this Mac from the dotfiles repo. Safe to run again.
#
# Usage: macos/install.sh              Install everything below
#        macos/install.sh --save-apps  Save the list of Homebrew apps to
#                                      macos/Brewfile, then commit it
#
# - Homebrew: installs everything in macos/Brewfile. Homebrew itself must already
#   be installed (https://brew.sh).
# - Configs: shared/home/ and macos/home/ are linked into $HOME with Stow.
# - Git: asks for your email and saves it in ~/.config/git/local (gitignored).
# - Obsidian: ~/GitHub/second-brain/.obsidian becomes a link to shared/obsidian/,
#   if the second-brain notes are cloned next to this repo.
# - Nushell: links its config files into ~/Library/Application Support/nushell.
# - Fonts: shared/fonts/install.sh installs the fonts that aren't in Homebrew.
# macOS settings aren't changed here; run macos/defaults.sh for those.

set -euo pipefail

MACOS="${0:A:h}"
DOTFILES="${MACOS:h}"

# Homebrew isn't on PATH yet in a brand-new shell
if ! command -v brew >/dev/null 2>&1 && [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi
if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew isn't installed. Install it from https://brew.sh, then run this again."
  exit 1
fi

if [[ "${1:-}" == "--save-apps" ]]; then
  brew bundle dump --file "$MACOS/Brewfile" --force
  echo "Saved the app list to $MACOS/Brewfile. Review it with git diff."
  exit 0
fi

echo "Homebrew: installing apps from Brewfile"
brew bundle --file "$MACOS/Brewfile"

# ~/.config must be a real folder first, or Stow links the whole folder and
# files that apps create there end up in the repo
echo "Configs: linking shared/home/ and macos/home/ into $HOME"
mkdir -p "$HOME/.config"
# Stops without changing anything if a real file is in the way: back it up or
# remove it, then run this again
stow -R -d "$DOTFILES/shared" -t "$HOME" home
stow -R -d "$MACOS" -t "$HOME" home

GIT_LOCAL="$HOME/.config/git/local"
echo "Git: $GIT_LOCAL"
if git config --file "$GIT_LOCAL" user.email >/dev/null 2>&1; then
  echo "  email already set"
else
  read "email?  Git email (leave empty to skip): " || email=""
  if [[ -n "$email" ]]; then
    git config --file "$GIT_LOCAL" user.email "$email"
    echo "  saved"
  else
    echo "  skipped: Git won't commit until you add it with:"
    echo "  git config --file $GIT_LOCAL user.email you@example.com"
  fi
fi

VAULT_CONFIG="${DOTFILES:h}/second-brain/.obsidian"
echo "Obsidian: $VAULT_CONFIG"
if [[ ! -d "${VAULT_CONFIG:h}" ]]; then
  echo "  second-brain isn't cloned next to this repo, skipped"
elif [[ -L "$VAULT_CONFIG" && "$(readlink "$VAULT_CONFIG")" == "$DOTFILES/shared/obsidian" ]]; then
  echo "  already linked"
else
  if [[ -e "$VAULT_CONFIG" || -L "$VAULT_CONFIG" ]]; then
    backup="$VAULT_CONFIG.bak-$(date +%Y%m%d-%H%M%S)"
    mv "$VAULT_CONFIG" "$backup"
    echo "  backed up to ${backup:t}"
  fi
  ln -s "$DOTFILES/shared/obsidian" "$VAULT_CONFIG"
  echo "  linked to $DOTFILES/shared/obsidian"
fi

# Nushell on macOS looks in ~/Library/Application Support/nushell, not
# ~/.config, so link its files from there (history files stay in that folder)
NU_DIR="$HOME/Library/Application Support/nushell"
echo "Nushell: $NU_DIR"
mkdir -p "$NU_DIR"
for f in config.nu env.nu macos.nu windows.nu; do
  ln -sfn "$HOME/.config/nushell/$f" "$NU_DIR/$f"
done
echo "  linked config.nu, env.nu, macos.nu, windows.nu"

echo "Fonts:"
"$DOTFILES/shared/fonts/install.sh"

echo "\nDone. Restart the shell with: exec zsh"
