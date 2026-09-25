#!/bin/bash

# ============================================================================
# CEEJAY WEBSITE - IMMEDIATE FIX FOR NETLIFY BUILD ERROR
# ============================================================================

echo "🔧 Fixing build issues..."
echo ""

# Step 1: Fix _redirects (folder → file)
echo "1️⃣ Fixing _redirects file..."
rm -rf public/_redirects
cat > public/_redirects << 'EOF'
/sitemap.xml /sitemap.xml 200
/robots.txt /robots.txt 200
/* /index.html 200
EOF
echo "   ✅ _redirects is now a file"
echo ""

# Step 2: Verify _redirects is correct
echo "2️⃣ Verifying _redirects..."
if [ -f "public/_redirects" ]; then
    echo "   ✅ _redirects exists as a file"
    echo "   Content:"
    cat public/_redirects
else
    echo "   ❌ ERROR: _redirects still not a file!"
    exit 1
fi
echo ""

# Step 3: Clean build
echo "3️⃣ Cleaning previous build..."
rm -rf dist node_modules package-lock.json
echo "   ✅ Cleaned"
echo ""

# Step 4: Fresh install
echo "4️⃣ Installing dependencies (this takes 1-2 minutes)..."
npm install
if [ $? -eq 0 ]; then
    echo "   ✅ Dependencies installed"
else
    echo "   ❌ ERROR: npm install failed"
    exit 1
fi
echo ""

# Step 5: Test build
echo "5️⃣ Testing build locally..."
npm run build
if [ $? -eq 0 ]; then
    echo "   ✅ Build succeeded!"
else
    echo "   ❌ ERROR: Build failed locally"
    echo "   Please send me the error above"
    exit 1
fi
echo ""

# Step 6: Verify dist folder
echo "6️⃣ Verifying dist folder..."
if [ -d "dist" ]; then
    echo "   ✅ dist folder created"
    echo "   Contents:"
    ls -lh dist/
else
    echo "   ❌ ERROR: No dist folder!"
    exit 1
fi
echo ""

# Step 7: Git status
echo "7️⃣ Checking git status..."
git status
echo ""

echo "============================================================================"
echo "✅ ALL CHECKS PASSED!"
echo "============================================================================"
echo ""
echo "Next steps:"
echo "1. Review changes above"
echo "2. Commit: git add . && git commit -m 'Fix build configuration'"
echo "3. Push: git push origin main"
echo "4. Netlify will auto-deploy"
echo "5. Wait 4 minutes"
echo "6. CHECK YOUR SITE! 🚀"
echo ""
echo "If Netlify STILL fails:"
echo "- Go to Netlify deploy log"
echo "- Copy EVERYTHING from 'Running build command' to the error"
echo "- Send me the full log"
echo ""
echo "============================================================================"
