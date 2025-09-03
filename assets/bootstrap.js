import { startStimulusApp, registerControllers } from 'vite-plugin-symfony/stimulus/helpers';

const app = startStimulusApp();

// enregistre automatiquement tous les contrôleurs Stimulus du dossier assets/controllers
registerControllers(
	app,
	import.meta.glob('./controllers/*_controller.js', {
		query: '?stimulus',
		eager: true,
	})
);
