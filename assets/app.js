import './bootstrap.js';
// Import automatique de toutes les images avec eager pour qu'elles soient effectivement traitées
import.meta.glob(['./images/**'], { eager: true });

// Desktop sidenav collapse/expand toggle
function initDesktopSidenavToggle() {
	const toggle = document.querySelector('.js-sidenav-toggle');
	if (!toggle) return;

	// Sur desktop (>= 992px), on bascule une classe sur body
	const mq = window.matchMedia('(min-width: 992px)');
	function onClick(e) {
		// Laisser Materialize gérer l'ouverture mobile, on n'empêche pas si mobile
		if (!mq.matches) return; // mobile/tablette: ne fait rien, Materialize ouvre la drawer
		e.preventDefault();
		document.body.classList.toggle('sidenav-collapsed');
	}
	toggle.addEventListener('click', onClick);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initDesktopSidenavToggle, { once: true });
} else {
	initDesktopSidenavToggle();
}

console.log('Vite app.js initialisé.');
