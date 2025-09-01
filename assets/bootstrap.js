import { startStimulusApp } from '@symfony/stimulus-bundle';
import MaterializeController from './controllers/materialize_controller.js';

const app = startStimulusApp();
// Enregistrement explicite de notre contrôleur local
app.register('materialize', MaterializeController);
