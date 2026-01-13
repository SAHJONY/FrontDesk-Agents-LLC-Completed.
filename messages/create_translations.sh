#!/bin/bash
# Create placeholder translation files for all 50 languages
# In production, these would be professionally translated

languages=("fr" "de" "it" "pt" "ru" "zh" "ja" "ko" "ar" "hi" "nl" "pl" "tr" "vi" "th" "id" "ms" "fil" "sv" "no" "da" "fi" "cs" "hu" "ro" "uk" "el" "he" "fa" "bn" "ur" "ta" "te" "mr" "gu" "kn" "ml" "si" "km" "lo" "my" "ka" "am" "sw" "zu" "af" "is" "mt")

for lang in "${languages[@]}"; do
  if [ ! -f "$lang.json" ]; then
    cp en.json "$lang.json"
    echo "Created $lang.json"
  fi
done
