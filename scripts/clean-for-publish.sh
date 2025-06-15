#!/bin/bash

# Script to remove development overrides before publishing
echo "Removing development overrides..."

# Remove the override from package.json if it exists
if jq -e '.pnpm.overrides."@efie-form/core"' package.json >/dev/null 2>&1; then
  # Create a temporary file with the overrides removed
  jq 'del(.pnpm.overrides."@efie-form/core")' package.json > package.json.tmp
  
  # If overrides object is now empty, remove it entirely
  if jq -e '.pnpm.overrides | length == 0' package.json.tmp >/dev/null 2>&1; then
    jq 'del(.pnpm.overrides)' package.json.tmp > package.json.tmp2
    mv package.json.tmp2 package.json.tmp
  fi
  
  mv package.json.tmp package.json
  echo "Development overrides removed from package.json"
else
  echo "No development overrides found"
fi
