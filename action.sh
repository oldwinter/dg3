#!/usr/bin/env bash

set -euo pipefail
set +x

# To fetch and use this script in a GitHub action:
#
# curl -s -S https://raw.githubusercontent.com/saberzero1/quartz-themes/master/action.sh | bash -s -- <THEME_NAME>

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[1;34m'
NC='\033[0m'

echo_err() { echo -e "${RED}$1${NC}"; }
echo_warn() { echo -e "${YELLOW}$1${NC}"; }
echo_ok() { echo -e "${GREEN}$1${NC}"; }
echo_info() { echo -e "${BLUE}$1${NC}"; }

THEME_DIR="themes"
QUARTZ_STYLES_DIR="quartz/styles"
FINAL_THEME_DIR="./$QUARTZ_STYLES_DIR/$THEME_DIR"

if [[ -f "./$QUARTZ_STYLES_DIR/custom.scss" ]]; then
  echo_ok "Quartz root successfully detected..."
elif [[ -f "./custom.scss" ]]; then
  echo_ok "Styles directory detected..."
  FINAL_THEME_DIR="./$THEME_DIR"
else
  echo_err "Cannot detect Quartz repository. Are you in the correct working directory?" >&2
  exit 1
fi

echo -e "Input theme: ${BLUE}$*${NC}"
echo "Parsing input theme..."

result=""
for param in "$@"; do
  if [[ -n "$result" ]]; then
    result="$result-"
  fi
  result="$result$param"
done

if [[ -z "$result" ]]; then
  echo_warn "No theme provided, defaulting to Tokyo Night..."
  result="tokyo-night"
fi

THEME=$(printf '%s' "$result" | tr '[:upper:]' '[:lower:]')
if [[ ! "$THEME" =~ ^[a-z0-9]+([_-][a-z0-9]+)*$ ]]; then
  echo_err "Invalid theme name '$THEME'. Use alphanumeric words separated by '-' or '_'." >&2
  exit 2
fi

echo -e "Theme parsed to ${BLUE}${THEME}${NC}"
echo "Fetching theme files..."

THEME_REPO_DIR=$(mktemp -d "${TMPDIR:-/tmp}/quartz-themes.XXXXXX")
STAGING_THEME_DIR=""
ACTIVE_BACKUP_DIR=""

cleanup() {
  status=$?
  trap - EXIT

  if [[ -n "$ACTIVE_BACKUP_DIR" && -d "$ACTIVE_BACKUP_DIR" ]]; then
    rm -rf -- "$FINAL_THEME_DIR"
    mv -- "$ACTIVE_BACKUP_DIR" "$FINAL_THEME_DIR"
  fi
  if [[ -n "$STAGING_THEME_DIR" && -d "$STAGING_THEME_DIR" ]]; then
    rm -rf -- "$STAGING_THEME_DIR"
  fi
  rm -rf -- "$THEME_REPO_DIR"

  exit "$status"
}
trap cleanup EXIT

git clone -n --depth=1 --filter=tree:0 https://github.com/saberzero1/quartz-themes.git "$THEME_REPO_DIR" >/dev/null 2>&1
git -C "$THEME_REPO_DIR" sparse-checkout set --no-cone "themes/$THEME" >/dev/null 2>&1
git -C "$THEME_REPO_DIR" checkout >/dev/null 2>&1

SOURCE_THEME_DIR="$THEME_REPO_DIR/themes/$THEME"
if [[ ! -d "$SOURCE_THEME_DIR" ]]; then
  echo_err "Theme '$THEME' was not found in the theme repository." >&2
  exit 1
fi

echo "Staging theme files..."
THEME_PARENT_DIR=$(dirname "$FINAL_THEME_DIR")
mkdir -p -- "$THEME_PARENT_DIR"
STAGING_THEME_DIR=$(mktemp -d "$THEME_PARENT_DIR/.themes.XXXXXX")
cp -R "$SOURCE_THEME_DIR"/. "$STAGING_THEME_DIR"/

if [[ -e "$FINAL_THEME_DIR" ]]; then
  ACTIVE_BACKUP_DIR="$THEME_PARENT_DIR/.themes.backup.$$"
  mv -- "$FINAL_THEME_DIR" "$ACTIVE_BACKUP_DIR"
fi
mv -- "$STAGING_THEME_DIR" "$FINAL_THEME_DIR"
STAGING_THEME_DIR=""

echo "Applying patches..."
if grep -q -e "quartz themes dark-only" -e "quartz themes light-only" "$FINAL_THEME_DIR/_index.scss"; then
  echo_warn "Single mode theme detected..."
  if [[ -f "quartz.layout.ts" ]]; then
    sed -i "/Component\.Darkmode()/d" "quartz.layout.ts"
  else
    echo_warn "quartz.layout.ts is not present; skipping the legacy dark-mode layout patch."
  fi
fi

CUSTOM_SCSS_PATH="$THEME_PARENT_DIR/custom.scss"
if grep -q '^@use "./themes";' "$CUSTOM_SCSS_PATH"; then
  echo_warn "Theme import line already present in custom.scss. Skipping..."
else
  sed -ir 's#@use "./base.scss";#@use "./base.scss";\n@use "./themes";#' "$CUSTOM_SCSS_PATH"
  echo_info "Added import line to custom.scss..."
fi

if [[ -n "$ACTIVE_BACKUP_DIR" && -d "$ACTIVE_BACKUP_DIR" ]]; then
  rm -rf -- "$ACTIVE_BACKUP_DIR"
  ACTIVE_BACKUP_DIR=""
fi

echo_ok "Finished fetching and applying theme '$THEME'."
