import './bootstrap.js';
// Import automatique de toutes les images avec eager pour qu'elles soient effectivement traitées
import.meta.glob(['./images/**'], { eager: true });
// Charge paresseuse des modules spécifiques pages
let mortgageInit = null;
async function initPageModules() {
	const root = document.getElementById('mortgage-simulator');
	if (root) {
		const { MortgageSimulator } = await import('./js/simulators/MortgageSimulator.js');
		const sim = new MortgageSimulator(root);
		sim.init();
		mortgageInit = sim;
	}
}

// Thème: init + toggle + persistance
function initThemeToggle() {
	const KEY = 'arkemis-theme';
	const btn = document.querySelector('.js-theme-toggle');
	if (!btn) return;

	function apply(theme) {
		const root = document.documentElement;
		const isLight = theme === 'light';
		root.classList.toggle('theme-light', isLight);
		root.classList.toggle('theme-dark', !isLight);
		root.setAttribute('data-theme', theme);
		// icône + état aria
		const icon = btn.querySelector('.js-theme-icon');
		if (icon) icon.textContent = isLight ? 'dark_mode' : 'light_mode';
		btn.setAttribute('aria-pressed', String(isLight));
		try { localStorage.setItem(KEY, theme); } catch (e) {}
	}

	btn.addEventListener('click', (e) => {
		if (e && e.preventDefault) e.preventDefault();
		const current = document.documentElement.getAttribute('data-theme') || 'dark';
		const next = current === 'dark' ? 'light' : 'dark';
		apply(next);
	});

	// synchroniser l'icône au chargement
	const current = document.documentElement.getAttribute('data-theme') || 'dark';
	apply(current);
}

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
	document.addEventListener('DOMContentLoaded', () => {
		initDesktopSidenavToggle();
		initThemeToggle();
		initPageModules();
	}, { once: true });
} else {
	initDesktopSidenavToggle();
	initThemeToggle();
	initPageModules();
}

console.log('Vite app.js initialisé.');
