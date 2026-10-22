#!/usr/bin/env zsh
# macOS settings that aren't stored in any config file. Safe to run again.
# Edit or delete lines to taste before running. Some need a logout to apply.
#
# Usage: macos/defaults.sh
#
# To find the setting behind a checkbox, run `defaults read > before.txt`,
# change it in System Settings, then `defaults read | diff before.txt -`.

set -euo pipefail

# Keyboard ---------------------------------------------------------------------

# Fast key repeat, with a short delay before it starts (needs a logout)
defaults write -g KeyRepeat -int 2
defaults write -g InitialKeyRepeat -int 15
# Holding a key repeats it instead of showing the accent menu, so hjkl in
# Neovim works. Accented letters still come from right Option in WezTerm.
defaults write -g ApplePressAndHoldEnabled -bool false
# No smart quotes, dashes, or autocorrect, which break typed code
defaults write -g NSAutomaticQuoteSubstitutionEnabled -bool false
defaults write -g NSAutomaticDashSubstitutionEnabled -bool false
defaults write -g NSAutomaticSpellingCorrectionEnabled -bool false

# Finder -----------------------------------------------------------------------

# Show file extensions and hidden files (Cmd+Shift+. toggles hidden files)
defaults write -g AppleShowAllExtensions -bool true
defaults write com.apple.finder AppleShowAllFiles -bool true
# Path bar at the bottom, list view, folders first
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder FXPreferredViewStyle -string Nlsv
defaults write com.apple.finder _FXSortFoldersFirst -bool true
# Search the current folder, not the whole Mac
defaults write com.apple.finder FXDefaultSearchScope -string SCcf
# No warning when changing a file extension
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false
# No .DS_Store files on network drives and USB drives
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# Dock -------------------------------------------------------------------------

# Hide the Dock, and show it without a delay
defaults write com.apple.dock autohide -bool true
defaults write com.apple.dock autohide-delay -float 0
# No recent apps in the Dock
defaults write com.apple.dock show-recents -bool false
# Keep Spaces in the order you put them in
defaults write com.apple.dock mru-spaces -bool false

# Apply -------------------------------------------------------------------------

killall Finder Dock 2>/dev/null || true
echo "Done. Log out and back in for the keyboard settings."
