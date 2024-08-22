# Release Instructions

This document provides instructions on how to perform releases for this project locally.

## Prerequisites

- You need a GitHub token with packages permissions. This token should be set in your `.env` file as `GITHUB_TOKEN`.

## Steps

1. **Set up your environment**

   Copy the `.env.template` file to a new file named `.env` in the same directory.

   ```bash
   cp .env.template .env
   ```

   Replace `<github_token_with_packages_perms>` in the `.env` file with your GitHub token.

2. **Perform the release**

   Run the following commands in your terminal:

   ```bash
   nx release --skip-publish
   nx run-many -t build
   nx release publish --yes
   ```

   These commands will:

- Prepare the release but skip the publishing step.
- Build the necessary components.
- Publish the release.

Please note that these instructions are for local release. For automated releases, refer to the GitHub Actions workflow defined in `.github/workflows/release.yml`.
