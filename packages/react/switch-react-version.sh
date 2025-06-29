#!/bin/bash

# Script to switch between React versions for type checking
# Usage: ./switch-react-version.sh [18|19]

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Usage: $0 [18|19]"
  echo "Current React version in node_modules:"
  if [ -f "node_modules/react/package.json" ]; then
    grep '"version"' node_modules/react/package.json | head -1
  else
    echo "React not installed"
  fi
  exit 1
fi

case $VERSION in
  18)
    echo "Switching to React 18 types..."
    # Create temporary package.json overrides
    cat > .react-version-override.json << EOF
{
  "overrides": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1"
  }
}
EOF
    ;;
  19)
    echo "Switching to React 19 types..."
    # Create temporary package.json overrides
    cat > .react-version-override.json << EOF
{
  "overrides": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
EOF
    ;;
  *)
    echo "Invalid version. Use 18 or 19."
    exit 1
    ;;
esac

echo "React $VERSION types configured. Run 'pnpm install' to apply changes."
echo "Then run 'pnpm type-check' to check types for React $VERSION."
