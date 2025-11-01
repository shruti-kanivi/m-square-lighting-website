#!/bin/bash

# M Square Lighting - Production Build Script
# This script builds the application for production deployment

set -e  # Exit on error

echo "🚀 Starting production build process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if node_modules exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing root dependencies...${NC}"
    npm install
fi

# Build Server
echo -e "${BLUE}Installing server dependencies...${NC}"
cd server
if [ ! -d "node_modules" ]; then
    npm install
fi
echo -e "${GREEN}✓ Server dependencies installed${NC}"
cd ..

# Build Client
echo -e "${BLUE}Building client for production...${NC}"
cd client
if [ ! -d "node_modules" ]; then
    npm install
fi

echo -e "${BLUE}Creating production build...${NC}"
npm run build

if [ -d "dist" ]; then
    echo -e "${GREEN}✓ Client build successful${NC}"
    echo -e "${GREEN}✓ Build files located in: client/dist/${NC}"
else
    echo -e "${RED}✗ Client build failed${NC}"
    exit 1
fi

cd ..

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Production build completed!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
