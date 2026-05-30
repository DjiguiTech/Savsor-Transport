# 🚀 Guide Déploiement Render - Savsor Transport Backend

## Avantages de Render vs VPS
✅ Déploiement automatique depuis GitHub  
✅ Gestion des variables d'environnement facile  
✅ Base de données PostgreSQL intégrée  
✅ SSL gratuit  
✅ Auto-scaling  
✅ Pas de gestion serveur manuelle  

---

## 📋 Prérequis

- Compte [render.com](https://render.com)
- Repository GitHub avec le code à jour
- Variables d'environnement prêtes

---

## ✅ Étape 1 : Créer la Base de Données PostgreSQL

1. Allez sur **[render.com](https://render.com)**
2. Connectez-vous ou créez un compte
3. Dashboard → **"New +"** → **"PostgreSQL"**
4. Remplissez:
   ```
   Name:           savsor-transport-db
   Database:       savsor_transport
   User:           savsor_user
   Region:         Frankfurt (eu-central-1)  ⬅️ choisissez selon votre région
   ```
5. Cliquez **"Create Database"**
6. **⚠️ IMPORTANT**: Copiez la **Database URL** complète (format: `postgresql://user:pass@host:5432/db`)

---

## ✅ Étape 2 : Créer le Web Service (Backend API)

1. Dashboard → **"New +"** → **"Web Service"**
2. Connectez GitHub:
   - Si première fois: Cliquez "Connect GitHub Account"
   - Sélectionnez le repository: `savsor-transport`
   - Autorisez Render

3. Configurez le Service:
   ```
   Name:              savsor-transport-backend
   Root Directory:    backend  ⬅️ IMPORTANT!
   Runtime:           Node
   Build Command:     npm install && npm run prisma:generate && npm run prisma:deploy
   Start Command:     node src/server.js
   ```

4. Cliquez **"Create Web Service"**

---

## ✅ Étape 3 : Configurer les Variables d'Environnement

Une fois le service créé:

1. Allez à l'onglet **"Environment"**
2. Cliquez **"Add Environment Variable"**
3. Ajoutez ces variables:

```
NODE_ENV              = production
PORT                  = 3000
DB_HOST              = (extrait de DATABASE_URL)
DB_PORT              = 5432
DB_NAME              = savsor_transport
DB_USER              = savsor_user
DB_PASSWORD          = (du Render PostgreSQL)
DB_SSL               = true

FRONTEND_URL         = https://yourfrontend.com
SMTP_HOST            = smtp.gmail.com (ou votre serveur)
SMTP_PORT            = 587
SMTP_USER            = your-email@gmail.com
SMTP_PASS            = your-app-password
EMAIL_FROM           = SAVSOR TRANSPORT <no-reply@savsortransport.com>
EMAIL_NOTIFICATION_TO = Contact@savsortransport.com
```

### 📌 Comment extraire DB_HOST de DATABASE_URL:
Si votre DATABASE_URL est:
```
postgresql://savsor_user:password123@awesome-db.postgres.render.com:5432/savsor_transport
```

Alors:
- `DB_HOST` = `awesome-db.postgres.render.com`
- `DB_PORT` = `5432`
- `DB_NAME` = `savsor_transport`
- `DB_USER` = `savsor_user`
- `DB_PASSWORD` = `password123`

---

## ✅ Étape 4 : Déployer

1. Une fois les variables ajoutées, cliquez **"Deploy"**
2. Render commence le build automatiquement
3. Suivez les logs dans **"Logs"**:
   - ✅ Build réussi: `npm install` OK
   - ✅ Migration DB: `prisma:deploy` OK
   - ✅ Serveur démarré: `API backend démarrée sur...` OK

---

## ✅ Étape 5 : Test de l'API

Une fois déployé, Render vous donne une URL comme: `https://savsor-transport-backend.onrender.com`

Testez:
```bash
curl https://savsor-transport-backend.onrender.com/api
```

Ou directement dans le navigateur:
```
https://savsor-transport-backend.onrender.com/api
```

---

## 🔗 Étape 6 : Connecter votre Domaine Personnalisé (Optionnel)

Si vous avez un domaine (`api.savsortransport.com`):

1. Service → **"Settings"** → **"Custom Domain"**
2. Entrez: `api.savsortransport.com`
3. Suivez les étapes pour configurer les DNS

---

## 🔄 Déploiement Automatique

Chaque fois que vous faites `git push` sur la branche configurée (par défaut `main`):
- Render redéploie automatiquement ✨
- Pas besoin d'intervention manuelle

---

## 🐛 Troubleshooting

### ❌ Build échoue: `npm install` erreur
```
→ Vérifiez package.json
→ Assurez-vous que tous les dépendances sont listées
→ Essayez: npm ci au lieu de npm install
```

### ❌ Base de données non trouvée
```
→ Vérifiez DB_HOST, DB_USER, DB_PASSWORD
→ Vérifiez que PostgreSQL est "Active" dans Render
→ Testez la connexion avec psql:
   psql -h your-host -U savsor_user -d savsor_transport
```

### ❌ "502 Bad Gateway" après déploiement
```
→ Vérifiez les logs: Logs tab
→ Cherchez les erreurs d'import ou de démarrage
→ Vérifiez PORT=3000 dans les variables
```

### ❌ L'API ne démarre pas (port already in use)
```
→ Render gère ça automatiquement
→ Attendez quelques secondes et rechargez
→ Si le problème persiste, redéployez: Settings → "Deploy"
```

---

## 📊 Monitoring

**Render fournit:**
- Real-time logs (tab "Logs")
- Metrics (CPU, Memory, Requests)
- Auto-restart en cas de crash
- Email alerts si problèmes

---

## 💾 Backup Base de Données

Render PostgreSQL inclut:
- ✅ Backups automatiques quotidiens
- ✅ Retention 7 jours
- ✅ Restauration facile via dashboard

---

## 🔐 Sécurité

- ✅ HTTPS/SSL automatique
- ✅ Variables d'env encryptées
- ✅ Pas de credentials dans le code
- ✅ DB password hash
- ⚠️ Ne mettez JAMAIS les credentials en dur dans le code!

---

## 📞 Commandes Utiles

```bash
# Local test avant déploiement
npm install
npm run prisma:generate
npm start

# Voir variables d'env sur Render
# (Dans le dashboard Environment tab)

# Redéployer manuellement
# Settings → "Deploy" ou git push
```

---

## ✨ Prochaine Étape

Une fois le backend déployé:
- Déployez le frontend sur [Vercel](https://vercel.com)
- Ou sur Render aussi
- Mettez à jour `FRONTEND_URL` dans les variables d'env

---

**Bon déploiement! 🚀**
