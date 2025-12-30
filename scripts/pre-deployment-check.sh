#!/bin/bash

# ============================================================================
# FRONTDESK AGENTS: Pre-Deployment Verification Script
# ============================================================================
# This script verifies the platform is ready for production deployment
# Run this before deploying to production

set -e

echo "🚀 FrontDesk Agents - Pre-Deployment Verification"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        ERRORS=$((ERRORS + 1))
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

print_info() {
    echo -e "ℹ️  $1"
}

echo "1. Checking Environment Configuration..."
echo "----------------------------------------"

# Check if .env files exist (they shouldn't in production)
if [ -f ".env" ] || [ -f ".env.local" ] || [ -f ".env.production" ]; then
    print_warning ".env files found in repository (should not be committed)"
else
    print_status 0 "No .env files in repository"
fi

# Check if .env.example exists
if [ -f ".env.example" ]; then
    print_status 0 ".env.example template exists"
else
    print_status 1 ".env.example template missing"
fi

echo ""
echo "2. Checking Dependencies..."
echo "----------------------------------------"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_status 0 "Dependencies installed"
else
    print_status 1 "Dependencies not installed (run: npm install)"
fi

# Check package.json exists
if [ -f "package.json" ]; then
    print_status 0 "package.json exists"
else
    print_status 1 "package.json missing"
fi

echo ""
echo "3. Checking Configuration Files..."
echo "----------------------------------------"

# Check next.config.js
if [ -f "next.config.js" ]; then
    print_status 0 "next.config.js exists"
else
    print_status 1 "next.config.js missing"
fi

# Check vercel.json
if [ -f "vercel.json" ]; then
    print_status 0 "vercel.json exists"
else
    print_warning "vercel.json missing (optional but recommended)"
fi

# Check tsconfig.json
if [ -f "tsconfig.json" ]; then
    print_status 0 "tsconfig.json exists"
else
    print_status 1 "tsconfig.json missing"
fi

# Check tailwind.config.js
if [ -f "tailwind.config.js" ]; then
    print_status 0 "tailwind.config.js exists"
else
    print_status 1 "tailwind.config.js missing"
fi

echo ""
echo "4. Checking Directory Structure..."
echo "----------------------------------------"

# Check required directories
REQUIRED_DIRS=("app" "components" "lib" "public")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        print_status 0 "$dir/ directory exists"
    else
        print_status 1 "$dir/ directory missing"
    fi
done

# Check for problematic directories
if [ -d "src/app" ]; then
    print_status 1 "Duplicate src/app directory found (should be removed)"
fi

if [ -d "api" ] && [ ! -d "app/api" ]; then
    print_status 1 "Root api/ directory found (should be in app/api/)"
fi

echo ""
echo "5. Checking Documentation..."
echo "----------------------------------------"

# Check documentation files
DOC_FILES=("README.md" "SECURITY.md" "MIGRATION_GUIDE.md")
for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status 0 "$file exists"
    else
        print_warning "$file missing"
    fi
done

echo ""
echo "6. Security Checks..."
echo "----------------------------------------"

# Check .gitignore
if [ -f ".gitignore" ]; then
    if grep -q ".env" ".gitignore"; then
        print_status 0 ".gitignore excludes .env files"
    else
        print_status 1 ".gitignore does not exclude .env files"
    fi
else
    print_status 1 ".gitignore missing"
fi

# Check for sensitive files
SENSITIVE_FILES=(".env" ".env.local" ".env.production" "*.pem" "*.key")
for pattern in "${SENSITIVE_FILES[@]}"; do
    if ls $pattern 1> /dev/null 2>&1; then
        print_status 1 "Sensitive files found: $pattern (should not be in repository)"
    fi
done

echo ""
echo "7. Build Test..."
echo "----------------------------------------"

# Try to build
print_info "Testing production build..."
if npm run build > /tmp/build.log 2>&1; then
    print_status 0 "Production build successful"
else
    print_status 1 "Production build failed (check /tmp/build.log)"
    echo ""
    echo "Build errors:"
    tail -20 /tmp/build.log
fi

echo ""
echo "=================================================="
echo "Verification Complete"
echo "=================================================="
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready for production deployment.${NC}"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS warning(s) found. Review before deploying.${NC}"
    exit 0
else
    echo -e "${RED}✗ $ERRORS error(s) and $WARNINGS warning(s) found.${NC}"
    echo -e "${RED}Please fix errors before deploying to production.${NC}"
    exit 1
fi
