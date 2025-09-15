#!/bin/bash

# ========================================
# GERDSEN AI Enhanced Local Development Server
# Optional npm install (set FORCE_NPM_INSTALL=1) and serves with fallbacks
# ========================================

echo "🚀 Starting GERDSEN AI Enhanced Website..."
echo ""

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to kill existing processes on port 4000
kill_existing_server() {
    if lsof -i :4000 >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Port 4000 is in use. Stopping existing server...${NC}"
        pkill -f "python.*http.server.*4000" 2>/dev/null || true
        pkill -f "http-server.*4000" 2>/dev/null || true
        kill $(lsof -t -i:4000) 2>/dev/null || true
        sleep 2
        echo -e "${GREEN}✅ Existing server stopped${NC}"
    fi
}

# Function to open browser (macOS specific)
open_browser() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "${BLUE}🌐 Opening browser...${NC}"
        sleep 2
        open "http://localhost:4000" 2>/dev/null || true
    fi
}

# Function to serve with Python (fallback)
serve_with_python() {
    echo -e "${YELLOW}📦 Using Python HTTP Server (fallback mode)${NC}"
    echo -e "${BLUE}ℹ️  Enhanced features: tsParticles, GSAP + ScrollTrigger, Lenis smooth scroll, lazy loading${NC}"
    echo ""
    
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}❌ Python 3 is required but not installed.${NC}"
        echo "Please install Python 3 or Node.js to run the development server."
        exit 1
    fi
    
    kill_existing_server
    
    echo -e "${GREEN}🟢 Server starting at: ${BLUE}http://localhost:4000${NC}"
    echo -e "${GREEN}📁 Serving from: ${BLUE}$(pwd)${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""
    
    open_browser &
    
    # Start Python server
    python3 -m http.server 4000
}

# Function to serve with Node.js/npm (enhanced mode)
serve_with_node() {
    echo -e "${GREEN}📦 Using Node.js Enhanced Mode${NC}"
    echo -e "${BLUE}ℹ️  Features: tsParticles, GSAP + ScrollTrigger, Lenis-based horizontal scroll, lazy loading${NC}"
    echo ""
    
    # Check if package.json exists
    if [[ ! -f "package.json" ]]; then
        echo -e "${YELLOW}⚠️  No package.json found, falling back to Python server${NC}"
        serve_with_python
        return
    fi
    
    # Skip auto-install by default; use CDN runtime. Force install with: FORCE_NPM_INSTALL=1 ./serve-local.sh
    if [[ -z "${FORCE_NPM_INSTALL}" ]]; then
        echo -e "${YELLOW}⏭️  Skipping npm install (CDN runtime). Set FORCE_NPM_INSTALL=1 to force install.${NC}"
    else
        echo -e "${YELLOW}📥 FORCE_NPM_INSTALL=1 detected, installing dependencies...${NC}"
        if [[ -f "package-lock.json" ]]; then
            npm ci
        else
            npm install
        fi
        if [[ $? -eq 0 ]]; then
            echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
        else
            echo -e "${RED}❌ Failed to install dependencies, falling back to Python${NC}"
            serve_with_python
            return
        fi
    fi
    
    # Check if http-server is available
    if ! npm list http-server >/dev/null 2>&1 && ! command -v http-server &> /dev/null; then
        echo -e "${YELLOW}⚠️  http-server not found, using npx...${NC}"
        HTTP_SERVER_CMD="npx http-server"
    else
        HTTP_SERVER_CMD="npm run dev"
    fi
    
    kill_existing_server
    
    echo -e "${GREEN}🟢 Server starting at: ${BLUE}http://localhost:4000${NC}"
    echo -e "${GREEN}📁 Serving from: ${BLUE}$(pwd)${NC}"
    echo -e "${GREEN}🎨 Features: Interactive particles, scroll animations, lazy loading${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""
    
    open_browser &
    
    # Start Node server
    if [[ "$HTTP_SERVER_CMD" == "npm run dev" ]]; then
        npm run dev
    else
        npx http-server -p 4000 -c-1
    fi
}

# Main execution
echo -e "${BLUE}🔍 Detecting development environment...${NC}"

# Check for Node.js
if command -v node &> /dev/null && command -v npm &> /dev/null; then
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ Node.js ${NODE_VERSION} detected${NC}"
    echo -e "${GREEN}✅ npm ${NPM_VERSION} detected${NC}"
    serve_with_node
else
    echo -e "${YELLOW}⚠️  Node.js not found${NC}"
    serve_with_python
fi
