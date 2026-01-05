# Contributing to FrontDesk Agents

Thank you for your interest in contributing to FrontDesk Agents! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js 22.x or higher
- pnpm 9.x or higher
- Git
- A GitHub account
- Basic knowledge of TypeScript and React

### Setting Up Your Development Environment

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FrontDesk-Agents-LLC-Completed..git
   cd FrontDesk-Agents-LLC-Completed.
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/SAHJONY/FrontDesk-Agents-LLC-Completed..git
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Workflow

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes**
   - Write clean, maintainable code
   - Follow the coding standards
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(dashboard): add real-time call metrics
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   pnpm build
   ```

2. **Update documentation**
   - Update README.md if needed
   - Add JSDoc comments to new functions
   - Update API documentation

3. **Rebase on main**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Submitting a Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

3. **PR Title Format**
   ```
   [Type] Brief description of changes
   ```
   
   Example: `[Feature] Add real-time call analytics dashboard`

4. **PR Description Should Include:**
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Screenshots (if applicable)
   - Related issues

### Review Process

1. **Automated Checks**
   - CI/CD pipeline will run automatically
   - All checks must pass before review

2. **Code Review**
   - At least one maintainer will review your PR
   - Address any feedback or requested changes
   - Be responsive to comments

3. **Approval and Merge**
   - Once approved, a maintainer will merge your PR
   - Your contribution will be included in the next release

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use strict type checking

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // implementation
}

// Bad
function getUser(id: any): any {
  // implementation
}
```

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Extract reusable logic into custom hooks
- Use proper prop types

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}

// Bad
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### File Organization

- One component per file
- Group related files in directories
- Use index files for exports
- Follow the project structure

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   └── index.ts
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas
- Use semicolons
- Max line length: 100 characters

```typescript
// Good
const user = {
  name: 'John',
  email: 'john@example.com',
};

// Bad
const user = {
  name: "John",
  email: "john@example.com"
}
```

## Testing Guidelines

### Unit Tests

- Write tests for all new features
- Aim for 80%+ code coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

```typescript
describe('formatDate', () => {
  it('should format date in MM/DD/YYYY format', () => {
    // Arrange
    const date = new Date('2026-01-05');
    
    // Act
    const result = formatDate(date);
    
    // Assert
    expect(result).toBe('01/05/2026');
  });
});
```

### Integration Tests

- Test component interactions
- Test API endpoints
- Test user flows

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test Button.test.tsx
```

## Documentation

### Code Documentation

- Add JSDoc comments to functions
- Document complex logic
- Include examples when helpful

```typescript
/**
 * Formats a date object into a human-readable string
 * @param date - The date to format
 * @param format - The desired format (default: 'MM/DD/YYYY')
 * @returns Formatted date string
 * @example
 * formatDate(new Date('2026-01-05')) // Returns '01/05/2026'
 */
export function formatDate(date: Date, format = 'MM/DD/YYYY'): string {
  // implementation
}
```

### README Updates

- Update README.md for new features
- Add examples and usage instructions
- Keep the documentation up to date

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error responses

## Questions?

If you have questions or need help:

- Open an issue on GitHub
- Join our community discussions
- Email: dev@frontdeskagents.com

Thank you for contributing to FrontDesk Agents! 🎉
