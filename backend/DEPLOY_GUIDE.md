# 🚀 Guide de Déploiement - Savsor Transport Backend

## Informations du Serveur

- **IP VPS** : `78.138.58.230`
- **Hostname** : `vpsl20625.serveur-vps.net`
- **Domaine** : `savsor-transport.com`
- **OS** : Debian 13 + ISPConfig 3
- **Base de données** : MySQL 
- **Gestionnaire d'app** : PM2

---

## Credentials

| Service | Identifiant | Mot de passe |
|---------|-------------|--------------|
| **ISPConfig Panel** | `admin` | `LI0b0o7XIW8aIa` |
| **FTP/SFTP** | `defaultsavsor_deploy` | `savsortransport` |
| **MySQL User** | `c0savsor_user` | `savsortransport` |
| **MySQL Database** | `c0savsor_transport_db` | - |

---

## Étape 1 : Accès au Serveur

### Via SFTP (Recommandé)

```bash
# Utilisez FileZilla ou un client SFTP
Host: vpsl20625.serveur-vps.net
Port: 22
Protocol: SFTP
Username: defaultsavsor_deploy
Password: savsortransport
```

### Via ISPConfig Web Panel

```
URL: https://vpsl20625.serveur-vps.net:8080
Username: admin
Password: LI0b0o7XIW8aIa
```

---

## Étape 2 : Préparer les Fichiers

1. **Uploads les fichiers backend** via SFTP vers :
   ```
   /var/www/clients/client0/web1/backend/
   ```

2. **Créez le répertoire des logs** :
   ```bash
   mkdir -p /var/www/clients/client0/web1/logs
   chmod 755 /var/www/clients/client0/web1/logs
   ```

3. **Placez les fichiers** :
   - `.env.production` → `/backend/.env`
   - `ecosystem.config.js` → `/backend/`
   - `src/` → `/backend/src/`
   - `package.json` → `/backend/`
   - `prisma/` → `/backend/` (si vous utilisez Prisma)

---

## Étape 3 : Installation via ISPConfig Terminal

1. Allez à ISPConfig → **Ligne de commande** (ou **Terminal** dans le menu)
2. Exécutez les commandes suivantes :

```bash
cd /var/www/clients/client0/web1/backend

# Installer les dépendances
npm install --production

# Générer le client Prisma
npx prisma generate

# Migrer la base de données
npx prisma migrate deploy

# Installer PM2 globalement (si pas fait)
npm install -g pm2

# Démarrer l'app avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Étape 4 : Vérifier que tout fonctionne

```bash
# Vérifier le status
pm2 status

# Voir les logs en direct
pm2 logs savsor-backend

# Tester l'API
curl http://localhost:3001
```

---

## Étape 5 : Configurer Nginx (ISPConfig)

1. Allez à **Sites Web** → Votre site
2. Allez à l'onglet **Réorienter**
3. Ajoutez une redirection pour l'API :

   ```
   Chemin: /api
   Type de redirection: Reverse Proxy
   Destination: http://localhost:3001
   ```

Ou configurez manuellement dans ISPConfig le reverse proxy Nginx.

---

## Étape 6 : Configuration CORS Frontend

Mettez à jour votre `.env` backend avec :

```env
FRONTEND_URL=https://savsor-transport.com
```

Puis configurez CORS dans `server.js` :

```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
```

---

## Commandes Utiles

```bash
# Démarrer l'app
pm2 start ecosystem.config.js

# Arrêter
pm2 stop savsor-backend

# Redémarrer
pm2 restart savsor-backend

# Supprimer
pm2 delete savsor-backend

# Voir les logs
pm2 logs savsor-backend

# Voir les détails de l'app
pm2 info savsor-backend

# Sauvegarder la config PM2
pm2 save

# Démarrer PM2 au boot du serveur
pm2 startup
pm2 save
```

---

## Troubleshooting

### L'app ne démarre pas
```bash
pm2 logs savsor-backend
# Vérifiez les erreurs dans les logs
```

### Problème de base de données
```bash
# Vérifiez la connexion MySQL
mysql -u c0savsor_user -p -h localhost c0savsor_transport_db
```

### Port 3001 déjà utilisé
```bash
# Trouvez le processus
lsof -i :3001

# Tuez-le
kill -9 <PID>
```

---

## Migration depuis Dev

Si vous avez des migrations Prisma :

```bash
npx prisma migrate deploy
# Ou pour créer une nouvelle migration
npx prisma migrate dev
```

---

## Support

Pour toute question, consultez :
- ISPConfig docs: https://www.ispconfig.org/
- PM2 docs: https://pm2.keymetrics.io/
- Prisma docs: https://www.prisma.io/docs/

---

**Déployé avec ❤️ sur Savsor Transport VPS**
