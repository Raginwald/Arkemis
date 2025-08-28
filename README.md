# Démarrage Docker — PHP 8.4 + Apache + MariaDB

Ce projet Symfony se lance avec une seule commande Docker Compose. Idéal pour développer sans installer PHP/Apache/MariaDB en local.

## Prérequis

- Docker Desktop (Windows/macOS/Linux)
- Docker Compose (inclus dans Docker Desktop récent)

## Lancer en une seule commande

Exécutez depuis la racine du projet:

```powershell
# construit les images si nécessaire et démarre app + db
docker compose up -d --build
```

- Ouvrez le site: <http://localhost:8000>
- Arrêtez et nettoyez (sans supprimer les données de la base):

```powershell
docker compose down
```
- Arrêtez et supprimez aussi les données:

```powershell
docker compose down -v
```

## Que fait cette stack ?

- app: PHP 8.4 + Apache, extensions utiles (intl, pdo_mysql, zip), DocumentRoot = `public/`, écoute sur 8000 (redirigé vers 80 dans le conteneur)
- db: MariaDB 11.4, base `app`, utilisateur `app`/`app`, volume nommé `db_data` pour persister vos données
- Votre code est monté en volume dans `app` pour un rechargement immédiat côté Apache

## Variables importantes

- Les identifiants DB ne sont pas dans `compose.yaml` mais dans `.env` (ou `.env.local` non versionné). Compose lit les variables `DB_*`.
- Doctrine est configuré via `DATABASE_URL` (défini dans `.env`) et pointe vers le service `db`:
  - `mysql://app:app@db:3306/app?serverVersion=mariadb-11.4`
  - Hôte de la DB = `db` (le nom du service), pas `localhost`

Astuce sécurité: placez vos vrais mots de passe dans `.env.local` (git-ignoré) pour ne pas les committer.

## Commandes utiles (depuis votre PowerShell)

- Voir les logs en continu:

```powershell
docker compose logs -f
```

- Lancer des commandes Symfony dans le conteneur:

```powershell
docker compose exec app php -v

# cache/migrations exemples
docker compose exec app php bin/console cache:clear
docker compose exec app php bin/console doctrine:database:create
docker compose exec app php bin/console make:migration
docker compose exec app php bin/console doctrine:migrations:migrate --no-interaction
```

- Rebuild après modification du Dockerfile:

```powershell
docker compose build --no-cache; docker compose up -d
```

## Dépannage rapide

- Page blanche/404: assurez-vous que l’URL est <http://localhost:8000> et que `public/.htaccess` existe (mod_rewrite activé dans l’image)
- Erreur DB: attendez que la DB soit « healthy » (`docker compose ps`) ou relancez `docker compose up -d`; vérifiez `DATABASE_URL`
- Droits d’écriture: si nécessaire, exécutez dans le conteneur

```powershell
docker compose exec app chown -R www-data:www-data var
```

Bon dev — une seule commande pour repartir:

```powershell
docker compose up -d --build
```
