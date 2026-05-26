#!/bin/bash

# ============================================================
# 🚀 Script de déploiement complet - Savsor Transport Backend
# ============================================================
# Ce script crée la structure complète et déploie l'application
# sur le VPS ISPConfig LWS en Mode Infogéré
# ============================================================

set -e

# CONFIGURATION
APP_DIR="/var/www/clients/client0/web1/backend"
LOGS_DIR="/var/www/clients/client0/web1/logs"
NODE_ENV="production"
PORT=3001

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonctions d'affichage
print_header() {
    echo -e "\n${GREEN}=== $1 ===${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# ============================================================
# 1. VÉRIFICATION DES PRÉREQUIS
# ============================================================
print_header "1. Vérification des prérequis"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi
print_success "Node.js version: $(node -v)"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi
print_success "npm version: $(npm -v)"

# ============================================================
# 2. CRÉER LES RÉPERTOIRES
# ============================================================
print_header "2. Création des répertoires"

mkdir -p "$APP_DIR"
mkdir -p "$LOGS_DIR"
mkdir -p "$APP_DIR/src"
mkdir -p "$APP_DIR/prisma"

print_success "Répertoires créés"

# ============================================================
# 3. COPIER LES FICHIERS DU PROJET LOCAL
# ============================================================
print_header "3. Copie des fichiers du projet"

# Copier depuis le répertoire courant vers le serveur
# (À adapter selon votre setup)
cd "$(dirname "$0")/savsor-transport/backend"

print_warning "Assurez-vous que vous avez uploadé package.json et src/ via FTP"

# ============================================================
# 4. CRÉER LES FICHIERS DE CONFIGURATION
# ============================================================
print_header "4. Création des fichiers de configuration"

# Créer .env
cat > "$APP_DIR/.env" << 'EOF'
NODE_ENV=production
PORT=3001

# Database MySQL
DATABASE_URL="mysql://c0savsor_user:savsortransport@localhost:3306/c0savsor_transport_db"

# CORS - Configuré pour votre frontend
FRONTEND_URL="https://savsor-transport.com"

# Email (si utilisé)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@savsor-transport.com
EOF

print_success ".env créé"

# Créer ecosystem.config.js
cat > "$APP_DIR/ecosystem.config.js" << 'EOF'
module.exports = {
  apps: [
    {
      name: 'savsor-backend',
      script: './src/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: '/var/www/clients/client0/web1/logs/error.log',
      out_file: '/var/www/clients/client0/web1/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
EOF

print_success "ecosystem.config.js créé"

# ============================================================
# 5. INSTALLER LES DÉPENDANCES
# ============================================================
print_header "5. Installation des dépendances npm"

cd "$APP_DIR"

if [ -f "package.json" ]; then
    npm install --production
    print_success "Dépendances installées"
else
    print_error "package.json introuvable dans $APP_DIR"
    print_warning "Assurez-vous d'avoir uploadé package.json via FTP"
    exit 1
fi

# ============================================================
# 6. CONFIGURER PRISMA
# ============================================================
print_header "6. Configuration de Prisma"

if [ -f "prisma/schema.prisma" ]; then
    npx prisma generate
    print_success "Client Prisma généré"

    npx prisma migrate deploy
    print_success "Migrations Prisma appliquées"
else
    print_warning "prisma/schema.prisma introuvable - Prisma peut ne pas être utilisé"
fi

# ============================================================
# 7. INSTALLER ET CONFIGURER PM2
# ============================================================
print_header "7. Configuration de PM2"

# Vérifier si PM2 est installé globalement
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 n'est pas installé globalement, installation..."
    npm install -g pm2
fi

# Arrêter l'app existante si elle tourne
pm2 delete savsor-backend 2>/dev/null || true

# Démarrer l'app avec PM2
pm2 start ecosystem.config.js
print_success "Application démarrée avec PM2"

# Sauvegarder la configuration PM2
pm2 save
print_success "Configuration PM2 sauvegardée"

# Configurer PM2 pour démarrer au boot
pm2 startup
print_success "PM2 configuré pour démarrer au boot"

# ============================================================
# 8. AFFICHER LE STATUS
# ============================================================
print_header "8. Status de l'application"

echo ""
pm2 status
echo ""

# ============================================================
# 9. INSTRUCTIONS FINALES
# ============================================================
print_header "✅ Déploiement terminé!"

echo ""
echo "📊 Commandes utiles:"
echo "  - pm2 status              → Voir le status"
echo "  - pm2 logs savsor-backend → Voir les logs"
echo "  - pm2 stop savsor-backend → Arrêter l'app"
echo "  - pm2 restart savsor-backend → Redémarrer"
echo ""
echo "🌐 Votre API devrait être accessible à:"
echo "  http://localhost:3001"
echo "  https://savsor-transport.com (via Nginx)"
echo ""
echo "🔧 Pour configurer Nginx comme reverse proxy:"
echo "  1. Allez dans ISPConfig → Sites → Votre site"
echo "  2. Onglet 'Réorienter'"
echo "  3. Ajoutez une redirection vers http://localhost:3001"
echo ""

# ============================================================
# FIN DU SCRIPT
# ============================================================
print_success "Tous les steps sont complétés!"
