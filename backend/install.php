<?php
// 🚀 Script d'installation PHP - Savsor Backend
// Accédez via : https://savsor-transport.com/backend/install.php

$baseDir = __DIR__;
$output = [];

function run($cmd) {
    global $output;
    $output[] = "$ " . $cmd;
    exec($cmd . " 2>&1", $result);
    $output[] = implode("\n", $result);
    return $result;
}

// Vérifier qu'on est en production
if ($_ENV['NODE_ENV'] !== 'production' && !isset($_GET['force'])) {
    die('Accès refusé. Cet script ne doit être exécuté qu\'une seule fois!');
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Installation - Savsor Backend</title>
    <style>
        body { font-family: monospace; background: #1e1e1e; color: #00ff00; padding: 20px; }
        pre { background: #000; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .success { color: #00ff00; }
        .error { color: #ff0000; }
        .warning { color: #ffff00; }
    </style>
</head>
<body>
    <h1>🚀 Installation Savsor Backend</h1>

    <?php
    // 1. Vérifier Node.js
    $output[] = "\n=== Vérification Node.js ===\n";
    run("node -v");
    run("npm -v");

    // 2. Installer les dépendances
    $output[] = "\n=== Installation des dépendances ===\n";
    run("cd " . $baseDir . " && npm install --production");

    // 3. Générer Prisma
    if (file_exists($baseDir . '/prisma/schema.prisma')) {
        $output[] = "\n=== Configuration Prisma ===\n";
        run("cd " . $baseDir . " && npx prisma generate");
        run("cd " . $baseDir . " && npx prisma migrate deploy");
    }

    // 4. Installer PM2
    $output[] = "\n=== Installation PM2 ===\n";
    run("npm install -g pm2");
    run("pm2 start " . $baseDir . "/ecosystem.config.js");

    $output[] = "\n✅ Installation terminée!\n";
    ?>

    <pre><?php echo implode("\n", $output); ?></pre>

    <p class="success">✅ Tous les steps sont complétés!</p>
    <p class="warning">⚠️ Supprimez ce fichier après l'installation pour des raisons de sécurité!</p>

    <hr>
    <h3>Commandes utiles :</h3>
    <pre>
pm2 status              # Voir le status
pm2 logs savsor-backend # Voir les logs
pm2 stop savsor-backend # Arrêter
pm2 restart savsor-backend # Redémarrer
    </pre>
</body>
</html>
