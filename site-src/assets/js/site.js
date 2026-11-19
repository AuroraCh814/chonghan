'use strict';
document.querySelectorAll('.publications button[aria-controls]').forEach(button => {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) return;
  button.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
  });
});
const toggle = document.querySelector('.navbar-toggler[aria-controls]');
if (toggle) {
  const menu = document.getElementById(toggle.getAttribute('aria-controls'));
  function open(value) {
    toggle.setAttribute('aria-expanded', String(value));
    toggle.classList.toggle('collapsed', !value);
    menu.classList.toggle('show', value);
  }
  toggle.addEventListener('click', () => open(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      open(false);
      toggle.focus();
    }
  });
}
