# Vite dans Arkemis

## Développement

- Lancer Vite (HMR):

```powershell
npm run dev
```

- Servir Symfony via WAMP/Apache (ou `symfony serve`).
- Les balises Twig `vite_entry_link_tags('app')` et `vite_entry_script_tags('app')` s’occupent d’inclure les assets.

## Production

```powershell
npm run build
```

- Les fichiers sont écrits dans `public/build`.

## Entrées

- JS: `assets/app.js` (importe `./bootstrap.js` et `./app.scss`).
- SCSS: `assets/app.scss`.

## Stimulus

- Helpers Vite utilisés dans `assets/bootstrap.js`.
- Les controllers dans `assets/controllers/*_controller.js` sont auto‑enregistrés.
