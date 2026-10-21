'use strict';
document.querySelectorAll('button[aria-controls^="summary-"]').forEach(button => {
  button.addEventListener('click', () => {
    const summary = document.getElementById(button.getAttribute('aria-controls'));
    summary.hidden = !summary.hidden;
    button.setAttribute('aria-expanded', String(!summary.hidden));
  });
});
const menu = document.querySelector('.mobile-toggle');
const navigation = document.querySelector('#nav-links');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});
