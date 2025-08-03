#!/bin/bash

# F1 Fan Hub - Demo Script
# This script demonstrates the setup process without actually running it

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# F1 ASCII Art
print_demo_header() {
    clear
    echo -e "${RED}"
    echo "  ███████╗ ██╗     ███████╗ █████╗ ███╗   ██╗    ██╗  ██╗██╗   ██╗██████╗ "
    echo "  ██╔════╝ ██║     ██╔════╝██╔══██╗████╗  ██║    ██║  ██║██║   ██║██╔══██╗"
    echo "  █████╗   ██║     █████╗  ███████║██╔██╗ ██║    ███████║██║   ██║██████╔╝"
    echo "  ██╔══╝   ██║     ██╔══╝  ██╔══██║██║╚██╗██║    ██╔══██║██║   ██║██╔══██╗"
    echo "  ██║      ███████╗██║     ██║  ██║██║ ╚████║    ██║  ██║╚██████╔╝██████╔╝"
    echo "  ╚═╝      ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ "
    echo -e "${NC}"
    echo -e "${WHITE}                    🏎️  Setup Process Demo  🏎️${NC}"
    echo -e "${CYAN}              This is a demonstration of the setup script${NC}"
    echo ""
}

# Simulate progress
simulate_progress() {
    local duration=$1
    local message=$2
    echo -ne "${YELLOW}$message${NC}"
    
    for ((i=0; i<=duration; i++)); do
        echo -ne "."
        sleep 0.1
    done
    echo -e " ${GREEN}✓${NC}"
}

# Demo function
demo_setup() {
    print_demo_header
    
    echo -e "${BLUE}📋 This demo shows what happens when you run: ${WHITE}./setup.sh${NC}"
    echo ""
    sleep 2
    
    echo -e "${BLUE}🔍 Step 1: Checking system requirements...${NC}"
    simulate_progress 15 "Checking Docker installation"
    simulate_progress 10 "Verifying Docker Compose"
    simulate_progress 8 "Testing Docker daemon"
    echo -e "${GREEN}✓ All requirements met${NC}"
    echo ""
    sleep 1
    
    echo -e "${BLUE}🧹 Step 2: Cleaning up existing containers...${NC}"
    simulate_progress 12 "Stopping existing containers"
    echo -e "${GREEN}✓ Cleanup completed${NC}"
    echo ""
    sleep 1
    
    echo -e "${BLUE}🏗️  Step 3: Building F1 Fan Hub application...${NC}"
    simulate_progress 25 "Building Docker images"
    simulate_progress 20 "Installing dependencies"
    simulate_progress 15 "Optimizing application"
    echo -e "${GREEN}✓ Application built successfully${NC}"
    echo ""
    sleep 1
    
    echo -e "${BLUE}⏳ Step 4: Starting the application...${NC}"
    simulate_progress 18 "Starting containers"
    simulate_progress 12 "Initializing services"
    simulate_progress 10 "Running health checks"
    echo -e "${GREEN}✓ Application is ready!${NC}"
    echo ""
    sleep 1
    
    echo -e "${GREEN}🎉 F1 Fan Hub is now running!${NC}"
    echo ""
    echo -e "${WHITE}📊 Application Details:${NC}"
    echo -e "${CYAN}  • URL: ${WHITE}http://localhost:3000${NC}"
    echo -e "${CYAN}  • Status: ${GREEN}Running${NC}"
    echo -e "${CYAN}  • Features: ${WHITE}20 F1 Drivers, Live Voting, Real-time Results${NC}"
    echo ""
    
    echo -e "${WHITE}🏎️  Available Pages:${NC}"
    echo -e "${CYAN}  • Drivers: ${WHITE}Browse all 2025 F1 drivers${NC}"
    echo -e "${CYAN}  • Vote: ${WHITE}Vote for next GP winner${NC}"
    echo -e "${CYAN}  • Results: ${WHITE}Live voting results with charts${NC}"
    echo ""
    
    echo -e "${WHITE}🛠️  Useful Commands:${NC}"
    echo -e "${CYAN}  • View logs: ${WHITE}docker compose logs -f${NC}"
    echo -e "${CYAN}  • Stop app: ${WHITE}docker compose down${NC}"
    echo -e "${CYAN}  • Restart: ${WHITE}docker compose restart${NC}"
    echo ""
    
    echo -e "${BLUE}🌐 The script would now open your browser to: ${WHITE}http://localhost:3000${NC}"
    echo ""
    echo -e "${GREEN}🏁 Setup completed successfully!${NC}"
    echo -e "${WHITE}Enjoy the F1 Fan Hub experience! 🏎️${NC}"
    echo ""
    echo -e "${YELLOW}To run the actual setup, use: ${WHITE}./setup.sh${NC}"
    echo ""
}

# Run demo
demo_setup
