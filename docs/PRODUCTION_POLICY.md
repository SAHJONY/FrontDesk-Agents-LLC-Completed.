# PRODUCTION POLICY

This document outlines the policy for deploying changes to the production environment for the FrontDesk Agents AI Phone OS platform.

## 1. Authorization
All production deployments must be authorized by the project owner (SAHJONY) or an authorized executor (Manus AI Engineering).

## 2. Deployment Method
The primary deployment method is via Git push to the `main` branch of the designated GitHub repository, which triggers an automatic build on Vercel.

## 3. Verification
A post-deployment verification checklist must be completed and logged in `/docs/DEPLOYMENT_LOG.md` before the deployment is considered successful.

## 4. Rollback
In case of critical failure, the immediate rollback strategy is to revert the last commit on the `main` branch and force a new Vercel build.
