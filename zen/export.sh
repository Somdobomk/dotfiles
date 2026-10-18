#!/usr/bin/env zsh
# Copy Zen Browser customizations from the macOS profile into this folder.
#
# Usage: ./export.sh [profile-folder-name]
#   Without an argument, uses the profile whose prefs.js changed most recently.
#
# Zen replaces files when it saves them, so the profile can't be symlinked
# into the repo. Run this after changing mods, shortcuts, or containers.

set -euo pipefail

ZEN_DIR="${0:A:h}"
PROFILES="$HOME/Library/Application Support/zen/Profiles"

if [[ -n "${1:-}" ]]; then
  profile="$PROFILES/$1"
else
  # Most recently modified prefs.js = the profile in use
  profile=( "$PROFILES"/*/prefs.js(N.om[1]) )
  profile="${profile:h}"
fi
[[ -d "$profile" ]] || { echo "Profile not found: $profile" >&2; exit 1; }
echo "Exporting from ${profile:t}"

# Only customizations. Never prefs.js or signedInUser.json (login tokens).
FILES=(zen-themes.json zen-keyboard-shortcuts.json containers.json)

for file in $FILES; do
  [[ -f "$profile/$file" ]] && cp "$profile/$file" "$ZEN_DIR/$file"
done

rm -rf "$ZEN_DIR/chrome"
mkdir -p "$ZEN_DIR/chrome"
[[ -f "$profile/chrome/zen-themes.css" ]] && cp "$profile/chrome/zen-themes.css" "$ZEN_DIR/chrome/"
[[ -d "$profile/chrome/zen-themes" ]] && cp -R "$profile/chrome/zen-themes" "$ZEN_DIR/chrome/"

# Mod settings are saved in prefs.js. Keep only the ones the installed
# mods declare in their preferences.json files.
properties=( ${(f)"$(grep -ohE '"property" *: *"[^"]+"' "$ZEN_DIR"/chrome/zen-themes/*/preferences.json(N) |
  sed -E 's/.*: *"//; s/"$//' | sort -u)"} )
: > "$ZEN_DIR/mod-prefs.js"
for property in $properties; do
  grep -F "user_pref(\"$property\"," "$profile/prefs.js" >> "$ZEN_DIR/mod-prefs.js" || true
done
echo "Saved $(wc -l < "$ZEN_DIR/mod-prefs.js" | tr -d ' ') mod settings"

echo "Done. Review with: git -C \"$ZEN_DIR\" status"
