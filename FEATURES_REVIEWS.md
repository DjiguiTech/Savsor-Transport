# 📝 Fonctionnalité : Gestion des Avis Clients

## Vue d'ensemble

Cette fonctionnalité permet aux visiteurs de soumettre leurs avis sur le site SAVSOR TRANSPORT. Les avis sont soumis avec modération et ne s'affichent publiquement que s'ils sont approuvés par un administrateur.

## 🎯 Fonctionnalités implémentées

### Frontend

#### 1. Composant `HomeAvis.tsx`
- ✅ Affiche les avis approuvés dynamiquement (chargement depuis l'API)
- ✅ Affiche les avis examples en cas d'absence d'avis approuvés
- ✅ Bouton "Laisser un avis" qui ouvre le formulaire modal
- ✅ Message de confirmation après soumission

#### 2. Composant `ReviewFormModal.tsx`
- ✅ Formulaire complet avec champs :
  - Nom (validé : 2+ caractères)
  - Email (validé : format email)
  - Note (1-5 étoiles, sélection interactive)
  - Commentaire (validé : 10-1000 caractères)
- ✅ Validation côté frontend
- ✅ Gestion des erreurs avec affichage de messages
- ✅ État de chargement pendant l'envoi
- ✅ Design responsive et modal avec fermeture

#### 3. Dashboard Admin (AdminDashboardPage.tsx)
- ✅ Nouvelle section "Avis clients" avec :
  - Tableau des avis avec filtrage par statut (all, pending, approved, rejected)
  - Recherche par nom, email ou commentaire
  - Tri par date (plus récents/anciens)
  - Actions pour chaque avis :
    - **En attente** : Boutons Approuver, Refuser
    - **Tous statuts** : Bouton Supprimer
  - Pagination (8 avis par page)
  - Indicateurs de statut visuels (badge avec couleurs)
- ✅ Statistiques mises à jour :
  - Total des avis
  - Avis approuvés
  - Avis en attente de modération

### Backend

#### 1. Base de données (Prisma)
- ✅ Modèle `Review` avec champs :
  - `id` : identifiant unique
  - `name` : nom du client (200 caractères max)
  - `email` : email du client (255 caractères max)
  - `rating` : note 1-5
  - `comment` : texte du commentaire
  - `status` : pending/approved/rejected
  - `ipAddress` : IP pour anti-spam
  - `createdAt` : date/heure de création
  - `updatedAt` : date/heure de modification
- ✅ Index sur `status` et `createdAt` pour performance

#### 2. API Routes (`/api/reviews`)

**Routes publiques :**
- `GET /api/reviews/public` → Récupère les avis approuvés
- `POST /api/reviews` → Soumettre un nouvel avis

**Routes admin :**
- `GET /api/reviews` → Récupère tous les avis (tous statuts)
- `PUT /api/reviews/:id/approve` → Approuver un avis
- `PUT /api/reviews/:id/reject` → Refuser un avis
- `DELETE /api/reviews/:id` → Supprimer un avis

#### 3. Validations & Sécurité

**Validations côté serveur :**
- ✅ Tous les champs requis
- ✅ Rating : 1-5 seulement
- ✅ Commentaire : 10-1000 caractères
- ✅ Email : format valide (regex simple)

**Anti-spam :**
- ✅ Max 1 avis par IP par jour (24h)
- ✅ Max 2 avis par email par jour (24h)
- ✅ Statuts HTTP 429 en cas dépassement

**Sanitization :**
- ✅ `.trim()` sur les inputs texte
- ✅ `.toLowerCase()` sur les emails

## 📊 Migration Prisma

Une migration SQL a été créée : `20260612120000_add_reviews`

Pour appliquer la migration :
```bash
cd backend
npm run prisma:migrate
```

Ou en production :
```bash
npm run prisma:deploy
```

## 🔧 Configuration

### Variables d'environnement backend
Aucune variable supplémentaire requise. L'API utilise `DATABASE_URL` existante.

### Variables d'environnement frontend
En développement : le proxy Vite redirige `/api` vers `http://localhost:5000`
En production : définir `VITE_API_URL` (ex: `https://api.savsor-transport.com`)

## 🚀 Déploiement

### Backend
1. Exécuter la migration Prisma : `npm run prisma:migrate`
2. Redémarrer le serveur Node

### Frontend
1. `npm run build` va créer une version optimisée
2. Aucun changement de configuration requis

## 🧪 Tester localement

### 1. Démarrer le backend
```bash
cd backend
npm install
npm run dev
```

### 2. Démarrer le frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Tester l'interface
1. Aller sur http://localhost:5173 (ou le port affiché)
2. Scroller vers la section "Avis clients"
3. Cliquer sur "Laisser un avis"
4. Remplir le formulaire et soumettre
5. Aller sur http://localhost:5173/admin/dashboard
6. Vérifier que l'avis appear en "En attente"
7. Approuver/Refuser/Supprimer l'avis
8. Vérifier que l'avis approuvé s'affiche sur la home

## 📱 Responsive & Design

- ✅ Formulaire modal : responsive sur mobile
- ✅ Tableau admin : scroll horizontal sur petit écran
- ✅ Affichage des avis : grille 3 colonnes → 2 → 1 sur mobile
- ✅ Étoiles : tailles adaptées selon le contexte

## 🔒 Sécurité

- ✅ Validation complète côté serveur (ne pas faire confiance au frontend)
- ✅ Rate limiting par IP et email (anti-spam)
- ✅ Routes admin accessibles publiquement mais avec rate limiting (⚠️ à sécuriser avec authentification admin)
- ✅ SQL injection : utilisation de `pool.query` avec paramètres ($1, $2, etc.)
- ✅ XSS : React échappe automatiquement le contenu

### ⚠️ À améliorer en production
- Ajouter un middleware d'authentification sur les routes admin (`PUT /:id/approve`, etc.)
- Ajouter une limite de taux globale (ou une CAPTCHA) sur `POST /reviews`
- Implémenter une liste noire IP/email pour les spammeurs persistants

## 📋 Checklist de déploiement

- [ ] Migration Prisma appliquée (`prisma:migrate`)
- [ ] Backend redémarré
- [ ] Frontend construit (`npm run build`)
- [ ] Test de soumission d'avis sur la home
- [ ] Test du dashboard admin (approuver/refuser)
- [ ] Vérification que les avis approuvés s'affichent sur la home
- [ ] Vérification du responsive sur mobile
- [ ] Test du rate limiting (soumettre 2 avis rapidement)

## 🐛 Troubleshooting

### Erreur : "Impossible de charger les avis"
- Vérifier que le backend est démarré sur le port 5000
- Vérifier les logs du backend pour erreurs DB
- Vérifier que la migration Prisma a été appliquée

### Les avis ne s'affichent pas après approbation
- Vérifier le statut dans le dashboard admin
- Vérifier les logs du frontend (F12 → Console)
- Vérifier que l'avis a bien le statut "approved" en DB

### Rate limiting trop restrictif
- Modifier `checkRateLimitByIp()` ou `checkRateLimitByEmail()` dans `reviews.service.js`
- Changer le délai de 24h (*60*60*1000) ou le nombre d'avis max (actuellement 1 par IP, 2 par email)

## 📚 Fichiers modifiés/créés

### Backend
- ✅ `prisma/schema.prisma` - Ajout du modèle Review
- ✅ `prisma/migrations/20260612120000_add_reviews/migration.sql` - Migration SQL
- ✅ `src/modules/reviews/reviews.service.js` - Service (CRUD + anti-spam)
- ✅ `src/modules/reviews/reviews.controller.js` - Controller (validation + endpoints)
- ✅ `src/modules/reviews/reviews.routes.js` - Routes
- ✅ `src/routes/index.js` - Enregistrement des routes reviews
- ✅ `src/modules/admin/admin.service.js` - Ajout stats des avis

### Frontend
- ✅ `src/components/home/ReviewFormModal.tsx` - Nouveau formulaire modal
- ✅ `src/components/home/HomeAvis.tsx` - Modifié pour charger avis dynamiquement
- ✅ `src/pages/AdminDashboardPage.tsx` - Ajout section gestion avis

## 🎨 Couleurs & Design

Les avis utilisent les couleurs existantes du projet :
- **Primaire** : `savsor-green` pour les étoiles et boutons
- **Secondaire** : `savsor-blue` pour les titres
- **Status** :
  - `amber` pour "En attente"
  - `emerald` pour "Approuvé"
  - `rose` pour "Refusé"

Tous les composants utilisent TailwindCSS et sont cohérents avec le design existant.
