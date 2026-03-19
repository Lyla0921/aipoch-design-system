#!/bin/sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SOURCE_HTML="$ROOT_DIR/AIPOCH Visual Design System.html"
DIST_DIR="$ROOT_DIR/dist"
TARGET_HTML="$DIST_DIR/index.html"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"
cp "$SOURCE_HTML" "$TARGET_HTML"

printf 'Built %s\n' "$TARGET_HTML"
