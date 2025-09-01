import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
// Import du CSS compilé (via Asset Mapper). On garde un fichier CSS unique.
import './styles/app.css';

// La gestion Materialize est désormais déléguée au contrôleur Stimulus "materialize"

// Ajuste la barre de progression Turbo: ne l’afficher que si la requête est vraiment lente
import * as Turbo from '@hotwired/turbo';
Turbo.setProgressBarDelay(600); // ms; augmentez si besoin ou mettez 0 pour l’afficher immédiatement

console.log('Arkemis UI ready');
