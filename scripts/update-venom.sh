#!/bin/bash
set -e

read -p "👉 Ingresa nueva versión de venom-bot: " NEW_VERSION

echo "📦 Actualizando a venom-bot@$NEW_VERSION y puppeteer@latest..."

npm install venom-bot@$NEW_VERSION puppeteer@latest

echo "🔧 Reconstruyendo Docker..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "✅ ¡Bot actualizado a venom-bot@$NEW_VERSION!"