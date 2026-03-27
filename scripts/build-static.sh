#!/bin/sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SOURCE_HTML="$ROOT_DIR/AIPOCH Visual Design System.html"
DIST_DIR="$ROOT_DIR/dist"
TARGET_HTML="$DIST_DIR/index.html"
SOURCE_ASSETS_DIR="$ROOT_DIR/assets"
TARGET_ASSETS_DIR="$DIST_DIR/assets"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"
cp "$SOURCE_HTML" "$TARGET_HTML"
if [ -d "$SOURCE_ASSETS_DIR" ]; then
    mkdir -p "$TARGET_ASSETS_DIR"
    cp -R "$SOURCE_ASSETS_DIR"/. "$TARGET_ASSETS_DIR"/
fi

printf 'Built %s\n' "$TARGET_HTML"
