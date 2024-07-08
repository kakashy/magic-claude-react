#!/bin/bash

# Install packages
# pnpm --prefer-offline install
bun install

# Function to extract package names from import statements
extract_packages() {
  grep -hoP "import.*?from\s+[\'\"]\K([^\'\"]+)" "$1" | grep -vE '^(./|@/)'
}

# Find all JS and JSX files two depths down, excluding node_modules and .gitignore entries
files=$(find . -maxdepth 2 -type f \( -name "*.js" -o -name "*.jsx" \) -not -path "*/node_modules/*" $(grep -v '^#' .gitignore | sed 's|^|!|'))

# Collect all unique package names
packages=()
for file in $files; do
  while IFS= read -r package; do
    if [[ ! " ${packages[*]} " =~ " ${package} " ]]; then
      packages+=("$package")
    fi
  done < <(extract_packages "$file")
done

# Run bun install
bun install

# Install each package as a dev dependency
if [ ${#packages[@]} -ne 0 ]; then
  bun add -D "${packages[@]}"
fi

echo "Packages installed successfully."
