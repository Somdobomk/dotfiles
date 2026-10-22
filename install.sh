#!/usr/bin/env zsh
# Set up this Mac from the dotfiles repo. Safe to run again.
#
# Usage: ./install.sh              Install everything below
#        ./install.sh --save-apps  Save the list of Homebrew apps to Brewfile,
#                                  then commit it
#
# - Homebrew: installs everything in Brewfile. Homebrew itself must already
#   be installed (https://brew.sh).
# - Configs: home/ is linked into $HOME with Stow.
# - Git: asks for your email and saves it in ~/.config/git/local (gitignored).
# - Fonts: fonts/install.sh installs the fonts that aren't in Homebrew.
# - Notes: the private Somdobomk/notes repo is cloned to ~/notes.
# macOS settings aren't changed here; run macos/defaults.sh for those.

set -euo pipefail

DOTFILES="${0:A:h}"

# Homebrew isn't on PATH yet in a brand-new shell
if ! command -v brew >/dev/null 2>&1 && [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi
if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew isn't installed. Install it from https://brew.sh, then run this again."
  exit 1
fi

if [[ "${1:-}" == "--save-apps" ]]; then
  brew bundle dump --file "$DOTFILES/Brewfile" --force
  echo "Saved the app list to $DOTFILES/Brewfile. Review it with git diff."
  exit 0
fi

echo "Homebrew: installing apps from Brewfile"
brew bundle --file "$DOTFILES/Brewfile"

# ~/.config must be a real folder first, or Stow links the whole folder and
# files that apps create there end up in the repo
echo "Configs: linking home/ into $HOME"
mkdir -p "$HOME/.config"
# Stops without changing anything if a real file is in the way: back it up or
# remove it, then run this again
stow -R -d "$DOTFILES" -t "$HOME" home

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

echo "Fonts:"
"$DOTFILES/fonts/install.sh"

NOTES="$HOME/notes"
echo "Notes: $NOTES"
if [[ -d "$NOTES" ]]; then
  echo "  already cloned"
elif git clone -q https://github.com/Somdobomk/notes.git "$NOTES"; then
  echo "  cloned"
else
  echo "  couldn't clone. Sign in with \`gh auth login\`, then run this again."
fi

echo "\nDone. Restart the shell with: exec zsh"
