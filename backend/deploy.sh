#!/bin/bash

# Script de déploiement pour Savsor Transport Backend
# Utilisation: ./deploy.sh

set -e

echo "🚀 Démarrage du déploiement Savsor Backend..."

# Variables
APP_DIR="/var/www/clients/client0/web1/backend"
NODE_ENV="production"
PORT=3001

# Créer le répertoire s'il n'existe pas
mkdir -p "$APP_DIR"

echo "📦 Installation des dépendances..."
cd "$APP_DIR"
npm install --production

echo "🔧 Génération du client Prisma..."
npx prisma generate

echo "🗄️ Migration de la base de données..."
npx prisma migrate deploy

echo "⚙️ Déploiement avec PM2..."
pm2 delete savsor-backend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo "✅ Déploiement terminé!"
echo "📊 Vérifier le status: pm2 status"
echo "📝 Voir les logs: pm2 logs savsor-backend"
