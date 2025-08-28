# Image de base: PHP dernière version stable 8.4 avec Apache
FROM php:8.4-apache

# Installe les dépendances système utiles et les extensions PHP nécessaires à Symfony/Doctrine
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        unzip \
        libicu-dev \
        libzip-dev \
        libxml2-dev \
        default-mysql-client \
    && docker-php-ext-install -j"$(nproc)" \
        intl \
        pdo_mysql \
        zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Configure le DocumentRoot d'Apache vers le dossier public/ de Symfony
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN set -eux; \
    sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
      /etc/apache2/sites-available/000-default.conf \
      /etc/apache2/apache2.conf

# Copie (optionnelle) du code dans l'image pour permettre un fonctionnement sans volume
# En développement, le dossier sera monté par Docker Compose et écrasera ce contenu
COPY . /var/www/html

# Droits d'écriture pour le cache/log Symfony
RUN mkdir -p /var/www/html/var \
    && chown -R www-data:www-data /var/www/html/var

# Port 80 exposé par l'image apache (par défaut)
# CMD/ENTRYPOINT par défaut de l'image apache démarre le serveur web automatiquement
