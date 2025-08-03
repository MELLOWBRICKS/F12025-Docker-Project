# 🤝 Contributing to F1 Fan Hub

First off, thank you for considering contributing to F1 Fan Hub! 🏎️ It's people like you that make the F1 community amazing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Focus on what's best** for the community
- **Show empathy** towards other community members

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** or **Docker**
- **Git** for version control
- **Basic knowledge** of JavaScript, HTML, CSS
- **Passion for Formula 1** 🏁

### Quick Setup

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/f1-fan-app.git
cd f1-fan-app

# Run the setup script
./setup.sh
```

## 🛠️ How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

**When submitting a bug report, please include:**

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Docker version)

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear title** and detailed description
- **Use case** and motivation
- **Possible implementation** approach
- **Mockups or examples** if applicable

### 🔧 Code Contributions

#### Areas We Need Help With

- **Frontend improvements** (UI/UX enhancements)
- **Backend optimizations** (performance, security)
- **New features** (additional voting options, statistics)
- **Mobile responsiveness** improvements
- **Accessibility** enhancements
- **Documentation** updates
- **Testing** (unit tests, integration tests)

## 💻 Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Docker Development

```bash
# Build and run with Docker
docker compose up --build

# For development with hot reload
docker compose -f docker-compose.dev.yml up
```

### Project Structure

```
f1-fan-app/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML
│   ├── styles.css         # Styles with liquid glass effects
│   └── script.js          # Interactive JavaScript
├── server.js              # Express server and API
├── package.json           # Dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
└── README.md             # Documentation
```

## 🔄 Pull Request Process

### Before Submitting

1. **Fork** the repository
2. **Create** a feature branch from `main`
3. **Make** your changes
4. **Test** your changes thoroughly
5. **Update** documentation if needed

### Submitting Your PR

1. **Push** your branch to your fork
2. **Create** a Pull Request to the `main` branch
3. **Fill out** the PR template completely
4. **Link** any related issues

### PR Requirements

- ✅ **Clear title** and description
- ✅ **Tests pass** (if applicable)
- ✅ **Code follows** style guidelines
- ✅ **Documentation** updated
- ✅ **No merge conflicts**

### Review Process

1. **Automated checks** will run
2. **Maintainers** will review your code
3. **Feedback** may be provided
4. **Approval** and merge once ready

## 🎨 Style Guidelines

### JavaScript

```javascript
// Use modern ES6+ features
const drivers = await fetchDrivers();

// Use descriptive variable names
const isVotingEnabled = checkVotingStatus();

// Add comments for complex logic
// Calculate vote percentage with proper rounding
const percentage = Math.round((votes / totalVotes) * 100 * 10) / 10;
```

### CSS

```css
/* Use CSS custom properties for consistency */
:root {
  --f1-red: #e50000;
  --glass-bg: rgba(255, 255, 255, 0.05);
}

/* Follow BEM naming convention */
.driver-card__image {
  /* styles */
}

/* Use modern CSS features */
.glass-effect {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

### HTML

```html
<!-- Use semantic HTML -->
<section class="drivers-section">
  <h2>F1 Drivers 2025</h2>
  <!-- content -->
</section>

<!-- Include accessibility attributes -->
<button aria-label="Vote for Max Verstappen" class="vote-btn">
  Vote
</button>
```

### Commit Messages

```bash
# Use conventional commits format
feat: add driver statistics page
fix: resolve voting button accessibility issue
docs: update API documentation
style: improve mobile responsiveness
```

## 🧪 Testing

### Manual Testing

- **Test all pages** (Drivers, Vote, Results)
- **Verify responsive design** on different screen sizes
- **Check browser compatibility** (Chrome, Firefox, Safari, Edge)
- **Test voting functionality** with cookies disabled/enabled

### Automated Testing (Future)

We're planning to add:
- **Unit tests** for utility functions
- **Integration tests** for API endpoints
- **E2E tests** for user workflows

## 📚 Documentation

When contributing, please update relevant documentation:

- **README.md** for new features
- **API documentation** for backend changes
- **Code comments** for complex logic
- **CHANGELOG.md** for notable changes

## 🌟 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **GitHub contributors** page
- **Release notes** for significant contributions

## 💬 Community

### Getting Help

- **GitHub Discussions** for questions and ideas
- **GitHub Issues** for bugs and feature requests
- **Pull Request comments** for code-specific discussions

### Communication Guidelines

- **Be respectful** and professional
- **Stay on topic** and be constructive
- **Help others** when you can
- **Share your F1 knowledge** and passion! 🏎️

## 🏁 Thank You!

Your contributions help make F1 Fan Hub better for the entire Formula 1 community. Whether you're fixing a small bug or adding a major feature, every contribution matters!

**Happy coding, and may your code be as fast as an F1 car! 🏎️💨**

---

<div align="center">

**Questions? Feel free to reach out!**

[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-blue?style=for-the-badge&logo=github)](https://github.com/yourusername/f1-fan-app/discussions)

</div>
