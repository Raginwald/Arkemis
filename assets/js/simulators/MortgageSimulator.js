import { Popover } from '../ui/Popover.js';

export class MortgageSimulator {
  constructor(root) {
    this.root = root || document;
    this.popover = new Popover();
    this.currentIcon = null;
  }

  init() {
    this.initPtzToggle();
    this.initInsuranceBasis();
    this.initPopovers();
    this.makeInfoIconsUnfocusable();
  }

  // PTZ show/hide
  initPtzToggle() {
    const ptzEnabled = this.root.querySelector('#ptz_enabled');
    const ptzFields = this.root.querySelector('#ptz_fields');
    if (!ptzEnabled || !ptzFields) return;
    const update = () => { ptzFields.style.display = ptzEnabled.checked ? 'block' : 'none'; };
    ptzEnabled.addEventListener('change', update);
    update();
  }

  // Insurance basis switch -> hidden field value
  initInsuranceBasis() {
    const basisSwitch = this.root.querySelector('#insurance_basis_switch');
    const basisHidden = this.root.querySelector('#insurance_basis');
    if (!basisHidden) return;
    const update = () => {
      const isRemaining = basisSwitch && basisSwitch.checked;
      basisHidden.value = isRemaining ? 'remaining' : 'initial';
    };
    if (basisSwitch) basisSwitch.addEventListener('change', update);
    update();
  }

  // Popovers on .info-icon (click to toggle, outside click closes)
  initPopovers() {
    document.addEventListener('click', (e) => {
      const icon = e.target.closest && e.target.closest('.info-icon');
      if (icon) {
        e.preventDefault();
        const title = icon.getAttribute('data-title') || '';
        const content = icon.getAttribute('data-content') || '';
        if (this.currentIcon === icon && this.popover.isVisible()) {
          this.popover.close();
          this.currentIcon = null;
        } else {
          this.popover.open(icon, title, content);
          this.currentIcon = icon;
        }
        return;
      }
      // outside click
      if (this.popover.isVisible()) {
        this.popover.close();
        this.currentIcon = null;
      }
    }, true);
  }

  // A11y: icons are not focusable in tab order
  makeInfoIconsUnfocusable() {
    try {
      this.root.querySelectorAll('.info-icon').forEach((el) => {
        el.setAttribute('tabindex', '-1');
        el.setAttribute('aria-hidden', 'true');
      });
    } catch (_) {}
  }
}
