
find dist -type f -name "README.md" -exec rm {} +
echo "# Linnea Gräf's shelter plugins" >>dist/README.md
for plugin in $(cd plugins/; ls); do
  echo "## $(jq -r .name < "plugins/$plugin/plugin.json")">>dist/README.md
  echo "" >> dist/README.md
  echo "Install url: \`https://nea89o.github.io/shelter-plugins/$plugin\`">>dist/README.md
  echo "" >> dist/README.md
  echo "$(jq -r .description < "plugins/$plugin/plugin.json")" >> dist/README.md
  echo "" >> dist/README.md
  echo "[Read more](./$plugin/)" >> dist/README.md

  echo "# $(jq -r .name < "plugins/$plugin/plugin.json")">>dist/"$plugin"/README.md
  echo "> **Note:** You are on a plugin page, probably by clicking one of the plugin links. You need to copy the link address and paste it into the shelter settings." >>dist/"$plugin"/README.md
  echo "" >>dist/"$plugin"/README.md
  echo "Install url: \`https://nea89o.github.io/shelter-plugins/$plugin\`">>dist/"$plugin"/README.md
  echo "" >>dist/"$plugin"/README.md
  echo "$(jq -r .description < "plugins/$plugin/plugin.json")" >>dist/"$plugin"/README.md
  echo "" >>dist/"$plugin"/README.md
  cat "plugins/$plugin/LONG_DESCRIPTION.md" >> dist/"$plugin"/README.md
done