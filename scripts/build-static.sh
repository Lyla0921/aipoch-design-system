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
cp "$ROOT_DIR/fonts.css" "$DIST_DIR/fonts.css"
if [ -d "$SOURCE_ASSETS_DIR" ]; then
    mkdir -p "$TARGET_ASSETS_DIR"
    cp -R "$SOURCE_ASSETS_DIR"/. "$TARGET_ASSETS_DIR"/
fi

# Publish the same reviewed skill files used by the repository; avoid duplicate assets.
mkdir -p "$DIST_DIR/skills"
cp -R "$ROOT_DIR/skills/aipoch-motion" "$DIST_DIR/skills/aipoch-motion"

printf 'Built %s\n' "$TARGET_HTML"
