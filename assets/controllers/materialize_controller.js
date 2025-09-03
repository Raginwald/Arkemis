// Contrôleur Stimulus pour initialiser/détruire automatiquement les composants Materialize
// Avantage: s’exécute à chaque navigation Turbo sans gérer manuellement app.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    // Initialisation lors de l’attachement au DOM
    this._initRetryCount = 0;
    this.init();

    // Ré-initialiser à chaque rendu Turbo (si Turbo est utilisé)
    this._onTurboLoad = () => this.init();
    this._onTurboRender = () => this.init();
    document.addEventListener('turbo:load', this._onTurboLoad);
    document.addEventListener('turbo:render', this._onTurboRender);
  }

  disconnect() {
    // Nettoyage avant détachement (Turbo cache/visites)
    this.teardown();
    document.removeEventListener('turbo:load', this._onTurboLoad);
    document.removeEventListener('turbo:render', this._onTurboRender);
    this._onTurboLoad = null;
    this._onTurboRender = null;
  }

  init() {
    // Évite les doublons si on ré-initialise
    this.teardown();

    // Attendre que Materialize soit présent (CDN peut arriver après notre connect)
    if (!window.M) {
      if (this._initRetryCount === 0) {
        console.warn('[materialize] M non présent, attente du script Materialize…');
      }
      if (this._initRetryCount < 10) {
        this._initRetryCount++;
        // Backoff léger et cumulatif
        const delay = 50 * this._initRetryCount;
        setTimeout(() => this.init(), delay);
      }
      return;
    }
    this._initRetryCount = 0;
    // Debug comptages
    const sidenavs = this.element.querySelectorAll('.sidenav');
    const dropdownTriggers = this.element.querySelectorAll('.dropdown-trigger');
    const collapsibles = this.element.querySelectorAll('.collapsible');
    const selects = this.element.querySelectorAll('select');
    const isProd = (() => {
      try {
        return typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'production';
      } catch (_) {
        return true;
      }
    })();
    if (!isProd) {
      console.debug('[materialize] init: M présent ✓', {
        sidenavs: sidenavs.length,
        dropdownTriggers: dropdownTriggers.length,
        collapsibles: collapsibles.length,
        selects: selects.length,
      });
    }
    // Met à jour l'état des labels/inputs (Materialize text inputs)
    // Utile si des valeurs sont pré-remplies (Turbo, cache, navigation)
    if (typeof M.updateTextFields === 'function') {
      M.updateTextFields();
    }
    // Conserver des références pour destruction
    this.sidenavInstances = M.Sidenav.init(sidenavs, {});
    this.dropdownInstances = M.Dropdown.init(dropdownTriggers, {
      constrainWidth: false,
      coverTrigger: false,
    });
    this.collapsibleInstances = M.Collapsible.init(collapsibles, {
      accordion: true,
      inDuration: 150,
      outDuration: 150,
    });
    this.selectInstances = M.FormSelect.init(selects, {});

    // Sécurité supplémentaire: si aucun sidenav/dropdown détecté, retenter une fois après micro délai
    if ((sidenavs.length === 0 || dropdownTriggers.length === 0) && this._postDomRetryDone !== true) {
      this._postDomRetryDone = true;
      setTimeout(() => this.init(), 0);
    } else {
      this._postDomRetryDone = false;
    }

    // Fallback ultime: si rien n'a été détecté ni initialisé, tenter AutoInit de Materialize
    if (sidenavs.length === 0 && dropdownTriggers.length === 0 && collapsibles.length === 0 && selects.length === 0) {
      try {
        if (!isProd) console.debug('[materialize] Aucun composant détecté, tentative M.AutoInit()');
        M.AutoInit();
      } catch (e) {
        console.warn('[materialize] AutoInit a échoué:', e);
      }
    }
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
