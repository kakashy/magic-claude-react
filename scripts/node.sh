#!/bin/bash

# Check for Node.js
if ! command -v node &> /dev/null; then
  echo "Node.js not found. Installing nvm and Node.js..."

  # Install nvm
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  # Export nvm environment variables
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

  # Install Node.js LTS
  nvm install --lts
else
  echo "Node.js is already installed."
fi

# Install pnpm and bun globally
npm install -g pnpm
curl -fsSL https://bun.sh/install | bash

echo "Installation completed."
