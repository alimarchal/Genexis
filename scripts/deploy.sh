#!/usr/bin/env bash
#
# Production deployment for the BAJK website. Run on the server, inside the
# application directory (the GitHub "Deploy" workflow does this over SSH):
#
#     bash scripts/deploy.sh
#
# Safe to run repeatedly. Built front-end assets (public/build) are uploaded
# separately by the workflow; to build them on the server instead, run with
# BUILD_ASSETS=1 (needs Node.js 22+).
set -euo pipefail

cd "$(dirname "$0")/.."

PHP="${PHP_BIN:-php}"
COMPOSER="${COMPOSER_BIN:-composer}"
BRANCH="${DEPLOY_BRANCH:-main}"

echo "==> Fetching ${BRANCH}"
git fetch --prune origin "${BRANCH}"
git merge --ff-only "origin/${BRANCH}"

echo "==> Installing PHP dependencies"
"${COMPOSER}" install --no-dev --prefer-dist --no-interaction --optimize-autoloader

if [ "${BUILD_ASSETS:-0}" = "1" ]; then
    echo "==> Building front-end assets"
    npm ci
    npm run build
fi

echo "==> Checking the environment (aborts before touching the live site on errors)"
"${PHP}" artisan bank:check

echo "==> Entering maintenance mode"
"${PHP}" artisan down --retry=30 --refresh=15 || true
trap '"${PHP}" artisan up' EXIT

echo "==> Migrating database"
"${PHP}" artisan migrate --force

echo "==> Linking storage"
"${PHP}" artisan storage:link 2>/dev/null || true

echo "==> Rebuilding caches"
"${PHP}" artisan optimize:clear
"${PHP}" artisan config:cache
"${PHP}" artisan route:cache
"${PHP}" artisan view:cache
"${PHP}" artisan event:cache

echo "==> Restarting queue workers (if any)"
"${PHP}" artisan queue:restart || true

echo "==> Deployment finished"
