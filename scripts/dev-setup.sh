#!/bin/bash

# Script to add development overrides for local development
echo "Adding development overrides..."

# Add the override to package.json
pnpm config set --location=project "pnpm.overrides.@efie-form/core" "link:./packages/core"

echo "Development overrides added. You can now run local development commands."
