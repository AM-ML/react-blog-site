#!/bin/bash

find . -type f -iname '*.webp' | while read -r file; do
  tmp="$(mktemp --suffix=.webp)"
  convert "$file" -resize '1280x720>' -quality 60 "$tmp" && mv "$tmp" "$file"
done

