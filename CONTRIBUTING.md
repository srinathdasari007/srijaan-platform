# Contributing to Srijaan Platform

Thank you for considering contributing to the Srijaan Platform! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/srijaan-platform.git
   cd srijaan-platform
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables** (see README.md)
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code formatting (ESLint configuration)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Guidelines
- Keep components focused and single-purpose
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the existing file structure

### File Organization
- Keep files under 300 lines when possible
- Use clear, descriptive file names
- Organize related components in directories
- Separate utilities, types, and components

## 🔧 Technical Requirements

### Frontend
- React 18+ with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- React Router for navigation

### Backend
- Supabase for database and auth
- Edge Functions for serverless logic
- Row Level Security (RLS) policies

## 🧪 Testing

Before submitting a PR:
1. Test all functionality manually
2. Ensure responsive design works
3. Check console for errors
4. Verify TypeScript compilation

## 📝 Commit Guidelines

Use clear, descriptive commit messages:
- `feat: add new workshop registration feature`
- `fix: resolve attendance tracking bug`
- `docs: update README with deployment instructions`
- `style: improve mobile responsiveness`

## 🔄 Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test thoroughly** on different screen sizes

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Screenshots for UI changes
   - List of changes made
   - Any breaking changes noted

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and device information
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Describe the problem it solves
- Provide use cases
- Consider implementation complexity
- Discuss with maintainers first for large features

## 📚 Areas for Contribution

### High Priority
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness
- Error handling

### Medium Priority
- Additional employee features
- Workshop management enhancements
- Analytics and reporting
- Email notification improvements

### Low Priority
- UI/UX enhancements
- Additional integrations
- Documentation improvements

## 🔒 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Follow Supabase security best practices
- Report security issues privately

## 📞 Getting Help

- Check existing issues and discussions
- Ask questions in issue comments
- Contact maintainers for guidance
- Join our community discussions

## 🎉 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Invited to join the core team for significant contributions

Thank you for contributing to Srijaan Platform! 🚀