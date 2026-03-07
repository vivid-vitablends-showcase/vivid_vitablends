# Pull Request

## Description

<!-- Provide a clear and concise description of the changes -->

## Type of Change

<!-- Mark the relevant option with an 'x' -->

- [ ] Feature (new functionality)
- [ ] Bug fix
- [ ] Hotfix (emergency production fix)
- [ ] Refactor (code improvement without functionality change)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Security fix

## Changes Made

<!-- List the specific changes made in this PR -->

-
-
-

## Related Issue

<!-- Link to the related issue if applicable -->

Closes #

## Testing Evidence

<!-- Provide evidence of testing: screenshots, test results, or testing steps -->

### Manual Testing

<!-- Describe the manual testing performed -->

- [ ] Tested locally
- [ ] Tested in development environment

### Automated Testing

<!-- Confirm tests pass -->

- [ ] All existing tests pass
- [ ] New tests added (if applicable)

## Pre-commit Hooks

<!-- Confirm pre-commit hooks were run and passed -->

- [ ] Backend: `cd backend && npm run lint-staged` passed
- [ ] Frontend: `cd frontend && npm run lint-staged` passed

## Checklist

<!-- Verify all items before submitting -->

### Code Quality

- [ ] Follows project structure and naming conventions
- [ ] No security vulnerabilities introduced
- [ ] No hardcoded secrets or credentials
- [ ] TypeScript types defined (frontend changes)
- [ ] Proper error handling implemented
- [ ] Logging added for important operations
- [ ] Code is self-documenting with minimal comments

### Architecture

- [ ] Follows layered architecture (Controllers → Services → Repositories)
- [ ] Single Responsibility Principle enforced
- [ ] DRY principle followed (no code duplication)
- [ ] Existing utilities/hooks reused where applicable

### API Changes (if applicable)

- [ ] API responses follow consistent format
- [ ] Cache invalidation implemented
- [ ] Database indexes added for new queries
- [ ] User-facing errors are friendly

### Documentation

- [ ] README updated (if setup/scripts/env vars changed)
- [ ] Inline comments added for complex logic
- [ ] API documentation updated (if endpoints changed)

### CI/CD

- [ ] All GitHub Actions checks pass
- [ ] No merge conflicts with target branch
- [ ] Linting passes (ESLint)
- [ ] Formatting passes (Prettier)
- [ ] TypeScript compilation succeeds (frontend)
- [ ] Build succeeds

## Screenshots

<!-- Add screenshots if UI changes were made -->

## Additional Notes

<!-- Any additional information reviewers should know -->

## Deployment Considerations

<!-- Note any special deployment requirements -->

- [ ] Database migrations required
- [ ] Environment variables added/changed
- [ ] Dependencies added/updated
- [ ] Breaking changes (describe below)

### Breaking Changes

<!-- Describe any breaking changes and migration path -->

## Reviewer Notes

<!-- Specific areas you'd like reviewers to focus on -->
