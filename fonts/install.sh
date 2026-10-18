#!/usr/bin/env zsh
# Install the fonts in this folder into ~/Library/Fonts (macOS).
#
# Usage: ./install.sh [-n]
#   -n  dry run: list what would be installed without copying anything
#
# Paid fonts go in ./private/, which is gitignored and can be its own
# private repo. They're installed the same way if the folder exists.

set -euo pipefail

FONT_DIR="${0:A:h}"
DEST="$HOME/Library/Fonts"
DRY_RUN=false
[[ "${1:-}" == "-n" ]] && DRY_RUN=true

# Skip duplicates of fonts that are installed from elsewhere:
# Windows-only builds, static Cascadia (variable is used), variable Inter (static is used)
EXCLUDE=(
  '*Windows*'
  '*/static/*'
  '*/Inter Variable/*'
)

excluded() {
  local pattern
  for pattern in "${EXCLUDE[@]}"; do
    [[ "$1" == ${~pattern} ]] && return 0
  done
  return 1
}

typeset -A seen
installed=0 skipped=0

# .otf before .ttf so the OpenType version wins when a font ships as both
for font in "$FONT_DIR"/**/*.otf(N.) "$FONT_DIR"/**/*.ttf(N.); do
  excluded "$font" && continue

  name="${font:t:r}"
  [[ -n "${seen[$name]:-}" ]] && continue
  seen[$name]=1

  if [[ -e "$DEST/${font:t}" ]]; then
    (( skipped += 1 ))
    continue
  fi

  if $DRY_RUN; then
    echo "would install ${font#$FONT_DIR/}"
  else
    cp "$font" "$DEST/"
  fi
  (( installed += 1 ))
done

if $DRY_RUN; then
  echo "$installed to install, $skipped already installed"
else
  echo "Installed $installed fonts, skipped $skipped already installed"
fi
