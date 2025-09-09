// Popover UI minimaliste, non interactive (pointer-events: none)
export class Popover {
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'ark-popover';
    this.el.style.visibility = 'hidden';
    this.el.style.opacity = '0';
    this.el.style.pointerEvents = 'none';
    document.body.appendChild(this.el);
    this.currentAnchor = null;

    // reposition on scroll/resize (capture to catch scroll within containers)
    window.addEventListener('scroll', () => {
      if (this.currentAnchor) this.position(this.currentAnchor);
    }, true);
    window.addEventListener('resize', () => {
      if (this.currentAnchor) this.position(this.currentAnchor);
    });
  }

  open(anchor, title, content) {
    this.close();
    this.el.innerHTML = `
      <div class="ark-popover__header">${title || ''}</div>
      <div class="ark-popover__content">${content || ''}</div>
    `;
    this.currentAnchor = anchor;
    this.position(anchor);
    this.el.style.visibility = 'visible';
    this.el.style.opacity = '1';
  }

  close() {
    this.el.style.opacity = '0';
    this.el.style.visibility = 'hidden';
    this.currentAnchor = null;
  }

  isVisible() {
    return this.el.style.visibility === 'visible';
  }

  position(anchor) {
    const rect = anchor.getBoundingClientRect();
    let top = rect.bottom + 8; // fixed relative to viewport
    let left = rect.left; // align left edge under icon

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const width = this.el.offsetWidth || 360;
    const height = this.el.offsetHeight || 180;

    // keep on screen horizontally
    if (left + width > viewportWidth - 12) left = viewportWidth - width - 12;
    if (left < 12) left = 12;

    // keep on screen vertically
    if (top + height > viewportHeight - 12) top = rect.top - height - 8;
    if (top < 12) top = 12;

    this.el.style.top = `${top}px`;
    this.el.style.left = `${left}px`;
  }
}
