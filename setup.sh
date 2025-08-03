#!/bin/bash

# F1 Fan Hub - Automated Setup Script
# This script will set up and run the F1 Fan Hub application

set -e  # Exit on any error

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
print_f1_logo() {
    echo -e "${RED}"
    echo "  ███████╗ ██╗     ███████╗ █████╗ ███╗   ██╗    ██╗  ██╗██╗   ██╗██████╗ "
    echo "  ██╔════╝ ██║     ██╔════╝██╔══██╗████╗  ██║    ██║  ██║██║   ██║██╔══██╗"
    echo "  █████╗   ██║     █████╗  ███████║██╔██╗ ██║    ███████║██║   ██║██████╔╝"
    echo "  ██╔══╝   ██║     ██╔══╝  ██╔══██║██║╚██╗██║    ██╔══██║██║   ██║██╔══██╗"
    echo "  ██║      ███████╗██║     ██║  ██║██║ ╚████║    ██║  ██║╚██████╔╝██████╔╝"
    echo "  ╚═╝      ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ "
    echo -e "${NC}"
    echo -e "${WHITE}                    🏎️  Formula 1 Fan Hub Setup  🏎️${NC}"
    echo -e "${CYAN}                 Modern F1 Voting App with Live Results${NC}"
    echo ""
}

# Progress bar function
show_progress() {
    local duration=$1
    local message=$2
    echo -ne "${YELLOW}$message${NC}"
    
    for ((i=0; i<=duration; i++)); do
        echo -ne "."
        sleep 0.1
    done
    echo -e " ${GREEN}✓${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system requirements
check_requirements() {
    echo -e "${BLUE}🔍 Checking system requirements...${NC}"
    
    # Check Docker
    if command_exists docker; then
        echo -e "${GREEN}✓ Docker is installed${NC}"
        DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
        echo -e "  ${CYAN}Version: $DOCKER_VERSION${NC}"
    else
        echo -e "${RED}✗ Docker is not installed${NC}"
        echo -e "${YELLOW}Please install Docker from: https://docs.docker.com/get-docker/${NC}"
        exit 1
    fi
    
    # Check Docker Compose
    if command_exists docker-compose || docker compose version >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Docker Compose is available${NC}"
    else
        echo -e "${RED}✗ Docker Compose is not available${NC}"
        echo -e "${YELLOW}Please install Docker Compose${NC}"
        exit 1
    fi
    
    # Check if Docker daemon is running
    if docker info >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Docker daemon is running${NC}"
    else
        echo -e "${RED}✗ Docker daemon is not running${NC}"
        echo -e "${YELLOW}Please start Docker and try again${NC}"
        exit 1
    fi
    
    echo ""
}

# Clean up any existing containers
cleanup_existing() {
    echo -e "${BLUE}🧹 Cleaning up existing containers...${NC}"
    
    if docker compose ps -q 2>/dev/null | grep -q .; then
        echo -e "${YELLOW}Stopping existing containers...${NC}"
        docker compose down >/dev/null 2>&1 || true
        echo -e "${GREEN}✓ Cleanup completed${NC}"
    else
        echo -e "${GREEN}✓ No existing containers to clean up${NC}"
    fi
    echo ""
}

# Build and start the application
build_and_start() {
    echo -e "${BLUE}🏗️  Building F1 Fan Hub application...${NC}"
    show_progress 20 "Building Docker images"
    
    if docker compose up --build -d >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Application built successfully${NC}"
    else
        echo -e "${RED}✗ Failed to build application${NC}"
        echo -e "${YELLOW}Check the error messages above${NC}"
        exit 1
    fi
    echo ""
}

# Wait for application to be ready
wait_for_app() {
    echo -e "${BLUE}⏳ Waiting for application to start...${NC}"
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:3000/api/drivers >/dev/null 2>&1; then
            echo -e "${GREEN}✓ Application is ready!${NC}"
            return 0
        fi
        
        echo -ne "${YELLOW}Attempt $attempt/$max_attempts...${NC}\r"
        sleep 2
        ((attempt++))
    done
    
    echo -e "${RED}✗ Application failed to start within expected time${NC}"
    echo -e "${YELLOW}You can check the logs with: docker compose logs${NC}"
    return 1
}

# Display application info
show_app_info() {
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
}

# Open browser (cross-platform)
open_browser() {
    echo -e "${BLUE}🌐 Opening F1 Fan Hub in your browser...${NC}"
    
    # Detect OS and open browser
    if command_exists xdg-open; then
        # Linux
        xdg-open http://localhost:3000 >/dev/null 2>&1 &
    elif command_exists open; then
        # macOS
        open http://localhost:3000 >/dev/null 2>&1 &
    elif command_exists start; then
        # Windows (Git Bash/WSL)
        start http://localhost:3000 >/dev/null 2>&1 &
    else
        echo -e "${YELLOW}Could not auto-open browser. Please manually visit: ${WHITE}http://localhost:3000${NC}"
        return
    fi
    
    sleep 2
    echo -e "${GREEN}✓ Browser opened${NC}"
}

# Main setup function
main() {
    clear
    print_f1_logo
    
    echo -e "${WHITE}Welcome to the F1 Fan Hub setup!${NC}"
    echo -e "${CYAN}This script will automatically set up and run the application.${NC}"
    echo ""
    
    # Ask for confirmation
    read -p "$(echo -e ${YELLOW}Do you want to continue? [Y/n]: ${NC})" -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        echo -e "${YELLOW}Setup cancelled.${NC}"
        exit 0
    fi
    echo ""
    
    # Run setup steps
    check_requirements
    cleanup_existing
    build_and_start
    
    if wait_for_app; then
        show_app_info
        
        # Ask if user wants to open browser
        read -p "$(echo -e ${YELLOW}Would you like to open the app in your browser? [Y/n]: ${NC})" -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
            open_browser
        fi
        
        echo ""
        echo -e "${GREEN}🏁 Setup completed successfully!${NC}"
        echo -e "${WHITE}Enjoy the F1 Fan Hub experience! 🏎️${NC}"
        echo ""
        echo -e "${CYAN}Visit: ${WHITE}http://localhost:3000${NC}"
        echo ""
    else
        echo -e "${RED}Setup failed. Please check the error messages above.${NC}"
        exit 1
    fi
}

# Handle script interruption
trap 'echo -e "\n${YELLOW}Setup interrupted. Cleaning up...${NC}"; docker compose down >/dev/null 2>&1; exit 1' INT TERM

# Run main function
main "$@"
