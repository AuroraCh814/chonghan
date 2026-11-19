'use strict';
document.querySelectorAll('.publications button[aria-controls]').forEach(button => {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) return;
  button.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
  });
});

const figureDialog = document.querySelector('.pub-figure-dialog');
if (typeof figureDialog?.showModal === 'function') {
  const title = document.getElementById('pub-figure-title');
  const fullImage = figureDialog.querySelector('.pub-figure-full');
  let opener;
  document.querySelectorAll('.pub-figure-trigger').forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      const image = link.querySelector('img');
      title.textContent = link.closest('.pub-row').querySelector('.title').textContent.trim();
      fullImage.alt = image.alt;
      fullImage.src = link.href;
      figureDialog.showModal();
    });
  });
  figureDialog.addEventListener('click', event => {
    if (event.target !== figureDialog) return;
    const { left, right, top, bottom } = figureDialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) figureDialog.close();
  });
  figureDialog.addEventListener('close', () => {
    fullImage.removeAttribute('src');
    fullImage.alt = '';
    opener?.focus({ preventScroll: true });
  });
}

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
