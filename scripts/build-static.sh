#!/bin/sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SOURCE_HTML="$ROOT_DIR/AIPOCH Visual Design System.html"
DIST_DIR="$ROOT_DIR/dist"
TARGET_HTML="$DIST_DIR/index.html"
ASSETS_DIR="$ROOT_DIR/assets/logo"
DIST_ASSETS_DIR="$DIST_DIR/assets/logo"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"
cp "$SOURCE_HTML" "$TARGET_HTML"

if [ -d "$ASSETS_DIR" ]; then
  mkdir -p "$DIST_ASSETS_DIR"
  cp "$ASSETS_DIR"/aipoch-logo-primary.svg "$DIST_ASSETS_DIR"/
  cp "$ASSETS_DIR"/aipoch-logo-primary.png "$DIST_ASSETS_DIR"/
  cp "$ASSETS_DIR"/aipoch-logo-inverse.svg "$DIST_ASSETS_DIR"/
  cp "$ASSETS_DIR"/aipoch-logo-inverse.png "$DIST_ASSETS_DIR"/
  cp "$ASSETS_DIR"/aipoch-logo-stacked.svg "$DIST_ASSETS_DIR"/
  cp "$ASSETS_DIR"/aipoch-logo-stacked.png "$DIST_ASSETS_DIR"/
fi

printf 'Built %s\n' "$TARGET_HTML"
