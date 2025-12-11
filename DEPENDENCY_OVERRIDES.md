# Dependency Overrides Documentation

This document explains the npm overrides in `package.json` and why they are necessary.

## Security Vulnerability Fixes

### nth-check: ^2.1.1
- **Issue**: CVE GHSA-rp65-9cf3-cjxr (High severity)
- **Description**: Inefficient Regular Expression Complexity in nth-check <2.0.1
- **CVSS Score**: 7.5/10
- **Resolution**: Upgrade to version 2.1.1 or higher

### postcss: ^8.4.49
- **Issue**: CVE GHSA-7fh5-64p2-3v2j (Moderate severity)
- **Description**: PostCSS line return parsing error in versions <8.4.31
- **CVSS Score**: 5.3/10
- **Resolution**: Upgrade to version 8.4.49 or higher

### svgo: ^2.8.0
- **Issue**: High severity vulnerability via css-select dependency
- **Description**: Depends on vulnerable versions of css-select which depends on nth-check
- **Resolution**: Upgrade to version 2.8.0 which uses newer dependencies

### webpack-dev-server: ^5.2.1
- **Issue**: CVE GHSA-9jgg-88mc-972h and GHSA-4v9v-hfq4-rm2v (Moderate severity)
- **Description**: Source code exposure vulnerability when accessing malicious websites
- **Resolution**: Upgrade to version 5.2.1 or higher

## Deprecation Warning Fixes

### glob: ^10.4.5
- **Issue**: npm deprecation warning
- **Message**: "Glob versions prior to v9 are no longer supported"
- **Resolution**: Upgrade to latest version (10.4.5)

### rimraf: ^6.0.1
- **Issue**: npm deprecation warning
- **Message**: "Rimraf versions prior to v4 are no longer supported"
- **Resolution**: Upgrade to latest version (6.0.1)

### inflight: ^2.1.0
- **Issue**: npm deprecation warning
- **Message**: "This module is not supported, and leaks memory"
- **Resolution**: Upgrade to version 2.1.0 which fixes the memory leak

## Why Overrides Are Needed

These packages are transitive dependencies of `react-scripts@5.0.1`, which is the latest stable version of Create React App's build tooling. Since react-scripts is no longer actively maintained and doesn't specify these updated dependencies, we use npm's `overrides` feature to force the use of secure, up-to-date versions.

## Note on react-scripts

Create React App (and thus react-scripts) is no longer actively maintained by the React team. Some deprecation warnings from deeply nested dependencies (like Babel plugins) cannot be resolved without:
1. Ejecting from Create React App, or
2. Migrating to a different build tool (Vite, Next.js, etc.)

However, all **security vulnerabilities** have been addressed through these overrides.
