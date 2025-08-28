import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
// Import du CSS compilé (via Asset Mapper). On garde un fichier CSS unique.
import './styles/app.css';

// Initialisation Materialize (JS) après chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
	// Sidenav (menu latéral)
	const sidenavs = document.querySelectorAll('.sidenav');
	M.Sidenav.init(sidenavs, {});

	// Dropdowns dans la navbar
	const dropdowns = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropdowns, { constrainWidth: false, coverTrigger: false });

	// Collapsible pour le sous-menu mobile
	const collapsibles = document.querySelectorAll('.collapsible');
	M.Collapsible.init(collapsibles, {});

	// Selects Materialize
	const selects = document.querySelectorAll('select');
	M.FormSelect.init(selects, {});
});

console.log('Arkemis UI ready');
