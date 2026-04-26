# SAVSOR TRANSPORT — frontend + backend

Le **frontend** (React, Vite, Tailwind CSS) est dans **`frontend/`** et le **backend** (Node.js, Express, PostgreSQL) est dans **`backend/`**.

## Prérequis

- Node.js (LTS recommandé)

## Frontend

À la racine du dépôt :

```bash
npm install --prefix frontend
npm run dev
```

Ou depuis **`frontend/`** :

```bash
cd frontend
npm install
npm run dev
```

| Script racine (`npm run …`) | Équivalent dans `frontend/` |
|----------------------------|-------------------------------|
| `dev`                      | serveur de développement Vite |
| `build`                    | build production              |
| `lint`                     | ESLint                        |
| `preview`                  | prévisualisation du build     |

Les fichiers statiques du site (`favicon`, `robots.txt`, `sitemap.xml`) se trouvent dans **`frontend/public/`**.

## Backend (Node.js + PostgreSQL)

### 1) Installer les dépendances

```bash
npm install --prefix backend
```

### 2) Configurer les variables d'environnement

Copier le fichier `backend/.env.example` vers `backend/.env`, puis adapter les valeurs PostgreSQL :

```bash
copy backend\.env.example backend\.env
```

Variables disponibles :

- `PORT` : port HTTP de l'API (par défaut `5000`)
- `DB_HOST` : hôte PostgreSQL
- `DB_PORT` : port PostgreSQL (par défaut `5432`)
- `DB_NAME` : nom de la base
- `DB_USER` : utilisateur PostgreSQL
- `DB_PASSWORD` : mot de passe PostgreSQL
- `DB_SSL` : `true` ou `false`

### 3) Lancer le backend

Depuis la racine :

```bash
npm run dev:backend
```

Ou directement dans `backend/` :

```bash
cd backend
npm run dev
```

### 4) Créer les tables PostgreSQL (réelles)

Les formulaires frontend `Contact` et `Devis` utilisent les tables:

- `contacts`
- `quotes`

Le module auth/users utilise:

- `users`

Exécuter le script SQL:

```bash
psql -h localhost -U postgres -d savsor_transport -f backend/sql/schema.sql
```

### 5) Vérifier l'API

Une fois démarrée, tester :

- `GET http://localhost:5000/api/health`

La route retourne l'état du backend et vérifie la connexion à PostgreSQL.

## Prisma (migrations PostgreSQL)

Prisma est configuré dans `backend/prisma/schema.prisma` et `backend/prisma.config.ts`.

Variables requises dans `backend/.env` :

- `DATABASE_URL`

Commandes utiles :

```bash
npm run --prefix backend prisma:generate
npm run --prefix backend prisma:deploy
npm run --prefix backend prisma:studio
```

Si la migration initiale n'a jamais été appliquée, `prisma:deploy` créera les tables `users`, `contacts`, `quotes`.

## Endpoints métier initialisés

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/contact` (alias)
- `POST /api/contact` (alias utilisé par le frontend)
- `GET /api/contacts`
- `POST /api/contacts`
- `GET /api/devis` (alias)
- `POST /api/devis` (alias utilisé par le frontend)
- `PATCH /api/devis/:id/status`
- `GET /api/quotes`
- `POST /api/quotes`
- `GET /api/admin/dashboard-stats`
