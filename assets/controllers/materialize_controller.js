// Contrôleur Stimulus pour initialiser/détruire automatiquement les composants Materialize
// Avantage: s’exécute à chaque navigation Turbo sans gérer manuellement app.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    // Initialisation lors de l’attachement au DOM
    this.init();
  }

  disconnect() {
    // Nettoyage avant détachement (Turbo cache/visites)
    this.teardown();
  }

  init() {
    if (!window.M) return;
    // Conserver des références pour destruction
    this.sidenavInstances = M.Sidenav.init(this.element.querySelectorAll('.sidenav'), {});
    this.dropdownInstances = M.Dropdown.init(this.element.querySelectorAll('.dropdown-trigger'), {
      constrainWidth: false,
      coverTrigger: false,
    });
    this.collapsibleInstances = M.Collapsible.init(this.element.querySelectorAll('.collapsible'), {
      accordion: true,
      inDuration: 150,
      outDuration: 150,
    });
    this.selectInstances = M.FormSelect.init(this.element.querySelectorAll('select'), {});
  }

  teardown() {
    const destroyAll = (instances) => {
      if (!instances) return;
      // Materialize renvoie un tableau d’instances quand on initialise sur un NodeList
      if (Array.isArray(instances)) {
        instances.forEach((inst) => inst && typeof inst.destroy === 'function' && inst.destroy());
      } else if (typeof instances.destroy === 'function') {
        instances.destroy();
      }
    };

    destroyAll(this.sidenavInstances);
    destroyAll(this.dropdownInstances);
    destroyAll(this.collapsibleInstances);
    destroyAll(this.selectInstances);

    this.sidenavInstances = null;
    this.dropdownInstances = null;
    this.collapsibleInstances = null;
    this.selectInstances = null;
  }
}
