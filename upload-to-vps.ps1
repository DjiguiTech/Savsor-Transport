# Script de déploiement vers VPS LWS
# Utilisation: .\upload-to-vps.ps1

param(
    [string]$SftpHost = "vpsl20625.serveur-vps.net",
    [string]$SftpUser = "defaultsavsor_deploy",
    [string]$SftpPassword = "savsortransport",
    [string]$LocalBackendPath = ".\backend",
    [string]$RemotePath = "/var/www/clients/client0/web1/backend"
)

Write-Host "🚀 Déploiement du Backend Savsor Transport" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Vérifier que le répertoire backend existe
if (-not (Test-Path $LocalBackendPath)) {
    Write-Host "❌ Erreur: Le répertoire $LocalBackendPath n'existe pas!" -ForegroundColor Red
    exit 1
}

# Créer un fichier batch SFTP
$SftpBatchFile = "$env:TEMP\sftp_commands.txt"
$Commands = @(
    "cd $RemotePath",
    "lcd $LocalBackendPath",
    "put -r .",
    "exit"
)

Write-Host "📝 Création des commandes SFTP..." -ForegroundColor Yellow
$Commands | Out-File -FilePath $SftpBatchFile -Encoding UTF8

# Exécuter SFTP
Write-Host "📤 Connexion et upload via SFTP..." -ForegroundColor Yellow
Write-Host "Host: $SftpHost" -ForegroundColor Gray
Write-Host "User: $SftpUser" -ForegroundColor Gray
Write-Host "Remote: $RemotePath" -ForegroundColor Gray

# Note: PowerShell ne supporte pas directement SFTP avec mot de passe non interactif
# On va utiliser scp ou une alternative

Write-Host ""
Write-Host "⚠️  Instructions manuelles:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Depuis PowerShell, exécutez cette commande:" -ForegroundColor White
Write-Host ""
Write-Host "sftp $SftpUser@$SftpHost" -ForegroundColor Cyan
Write-Host ""
Write-Host "Mot de passe: $SftpPassword" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ensuite, dans SFTP, tapez:" -ForegroundColor White
Write-Host ""
Write-Host "cd /var/www/clients/client0/web1/backend" -ForegroundColor Cyan
Write-Host "lcd .\backend" -ForegroundColor Cyan
Write-Host "put -r ." -ForegroundColor Cyan
Write-Host "exit" -ForegroundColor Cyan
Write-Host ""
Write-Host "ou utilisez un client SFTP comme FileZilla (plus simple)" -ForegroundColor Yellow
