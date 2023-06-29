# README

The following document describes the steps necessary to get the marquee app running locally.

### How to setup

-   All local testing has been done with node v19.6.1 and yarn.
-   Clone the .env.local.sample into a newly created .env.local file. Grab environment variables from a marquee developer (Hicham/Chrissy/Derek).
-   To set the githooks for the project run `git config core.hooksPath .git-hooks/` in the project directory.
-   Run `yarn` to build the dependencies.
-   Run `yarn dev` to run the app under localhost:3000.
-   Run `yarn storybook` to get the storybook workshop app running under localhost:6006.

### Scripts
-   `yarn dev` Will run the local nextjs app under localhost:3000.
-   `yarn storybook` Will run the local storybook app under localhost:6006.
-   `yarn test` Will run mocha tests specified in the test/ directory.

### Linting

1. In visual studio code, ensure you have the following plugins.
    - stylelint - CSS/PostCSS validation.
    - ESLint    - Javascript validation.
    - Prettier  - Code Formatter.
2. Code formatting settings for this project are located in .vscode/settings.json. Linting is based off the nextjs default next/core-web-vitals eslint standards.

### Directory Layout

```bash
├── .git-hooks/                             # Basic pre-commit hook for linting/running test(s) before submitting code to github.
├── .next/                                  # Distributed client side files to serve.
├── .vscode/                                # Prettier setting with linting for front-end/back-end.
├── .storybook/                             # Storybook configuration files.
├── app/
    ├── api/                                # Vercel edge functions go here.
    ├── dashboard/                          # Authenticated dashboard routes go here.
    ├── login/                              # Login page.
├── components/                             # UI component atoms, molecules, and organisms written and managed here. Used as reference for story book as well.
├── lib/                                    # Reusable functionality used across the app.
├── node_modules/                           # NPM packages.
├── public/                                 # Assets to server statically.
├── stories/                                # Storybook default homepage files and example stories.
├── styles/                                 # Global styles used across the app.
├── test/                                   # Mocha test file(s) to run on pre-commit under certain conditions.
├── .env.local.sample                       # Sample environment variables.
├── .eslintrc.json                          # Linting rules.
├── .gitignore                              # Files to ignore in github.
├── middleware.ts                           # Middleware function to run prior to matching routes.
├── next.config.js                          # Next app configurations.
├── .package.json                           # Project dependencies.
├── postcss.config.js                       # Post CSS configurations.
├── tailwind.config.js                      # Tailwind configurations.
├── tsconfig.json                           # Typescript configurations.
```
