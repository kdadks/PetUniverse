# 🧭 Branching & Workflow Guide

**Project Branching Model — `Feature → UAT → Main`**

This document defines the branching strategy, naming conventions, and merge rules for our GitHub repository.

---

## 🧱 Branch Structure

| Branch | Purpose | Notes |
|:-------|:---------|:------|
| **main** | Production-ready code | Protected branch — only merged after UAT approval |
| **uat** | User Acceptance Testing (staging) | Integration of all completed features |
| **dev-\*** | Developer feature branches | Each developer works independently here |

---

## 🌱 Creating a New Branch

To start working on a new feature or bug fix:

```bash
# Make sure you’re up to date
git checkout uat
git pull origin uat

# Create your dev branch
git checkout -b dev-[name]/[feature]
git push -u origin dev-[name]/[feature]
```

🧩 Example:
```bash
git checkout -b dev-amit/login-page
```

---

## 👩‍💻 Developer Workflow

1. Work only on your **dev branch**.
2. Commit and push changes regularly:
   ```bash
   git add .
   git commit -m "feat: implemented login UI"
   git push
   ```
3. When your work is ready for testing:
   - Create a **Pull Request (PR)** to merge into `uat`.
   - Request code review from another developer or the project lead.

---

## 🧪 UAT Workflow

Once PRs from all dev branches are merged into `uat`:
- Deploy the `uat` branch to the **staging/testing environment**.
- QA/clients test the changes.
- If issues are found, fixes happen in `dev-[name]/fix-*` branches, then merged again into `uat`.

---

## 🚀 Release to Production

When UAT passes all tests:
```bash
# Merge uat into main
git checkout main
git pull origin main
git merge origin/uat
git push origin main
```

✅ `main` should always be **stable, tested, and production-ready.**

---

## 🛡️ Branch Protection Rules (GitHub Settings)

| Branch | Protection | Rule |
|:--------|:------------|:------|
| **main** | ✅ Protected | Require pull request review before merge; no direct pushes |
| **uat** | ✅ Protected | Require all CI checks/tests to pass |
| **dev-\*** | ❌ Not protected | Developers can push freely |

---

## 🧩 Naming Conventions

| Branch Type | Format | Example |
|:-------------|:--------|:---------|
| Developer feature | `dev-[name]/[feature]` | `dev-amit/signup-api` |
| Bug fix | `dev-[name]/fix-[issue]` | `dev-raj/fix-login-error` |
| Hotfix (urgent) | `hotfix/[short-desc]` | `hotfix/payment-timeout` |
| Release | `release/v[version]` | `release/v1.0.0` |

---

## 🧰 Useful Commands

```bash
# Update your branch with latest UAT code
git fetch origin
git merge origin/uat

# Delete merged branch locally and remotely
git branch -d dev-amit/login-page
git push origin --delete dev-amit/login-page
```

---

## 🧩 Example Workflow Summary

```
dev-amit/login-page → 
                      \
                       → uat → main
                      /
dev-raj/dashboard →
```

---
