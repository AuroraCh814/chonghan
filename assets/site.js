'use strict';
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  if(theme === 'dark') root.dataset.theme = 'dark'; else delete root.dataset.theme;
  themeButton.textContent = theme === 'dark' ? '☾' : '☼';
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}
let storedTheme = 'light';
try { storedTheme = localStorage.getItem('theme') || 'light'; } catch {}
applyTheme(storedTheme);
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(next);
  try {localStorage.setItem('theme',next);} catch {}
});
document.querySelectorAll('button[aria-controls^="summary-"]').forEach(b => b.addEventListener('click', () => {
  const target = document.getElementById(b.getAttribute('aria-controls'));
  target.hidden = !target.hidden; b.setAttribute('aria-expanded', String(!target.hidden));
}));
const prefix = document.body.dataset.prefix;
const pages = [
  {title:'About Chong Han',path:'',keywords:'Penn UCLA mathematics learning control robotics contact'},
  {title:'Publications',path:'publications/',keywords:'papers journals ICML EMBC'},
  {title:'Projects',path:'projects/',keywords:'research robot learning'},
  {title:'Curriculum vitae',path:'cv/',keywords:'cv education experience skills'},
  {title:'CleanGuide',path:'projects/cleanguide/',keywords:'diffusion policy action guidance ICRA'},
  {title:'Execution-horizon selection in learned-model MPC',path:'projects/execution-horizon/',keywords:'replan model predictive control uncertainty cost gap'},
  {title:'Adding–swapping mappings for k-th power permutations in Sₙ',path:'publications/#power-permutations',keywords:'mathematics combinatorics Ars Anifowoshe permutations'},
  {title:'Seizure-Semiology-Suite (S³)',path:'publications/#s3',keywords:'ICML spotlight multimodal benchmark dataset'},
  {title:'Pathologic movement understanding',path:'publications/#pathologic-movements',keywords:'EMBC seizure semiology language models'},
  {title:'Crisis-dependent linkages in major exchange rates',path:'publications/#exchange-rates',keywords:'finance currency'}
];
const dialog = document.querySelector('.search-dialog');
const input = document.querySelector('#site-search');
const results = document.querySelector('#search-results');
function renderResults() {
  const q = input.value.toLowerCase().trim();
  const matches = pages.filter(p => `${p.title} ${p.keywords}`.toLowerCase().includes(q));
  results.replaceChildren(...matches.map(p => {const li=document.createElement('li');const a=document.createElement('a');a.textContent=p.title;a.href=prefix+p.path;li.append(a);return li;}));
  document.querySelector('#search-empty').hidden = matches.length !== 0;
}
function openSearch(){renderResults();dialog.showModal();input.focus();}
document.querySelector('.search-toggle').addEventListener('click', openSearch);
document.querySelector('.search-close').addEventListener('click',()=>dialog.close());
input.addEventListener('input',renderResults);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog.open)dialog.close();else openSearch();}});
results.addEventListener('click', e=>{if(e.target.closest('a'))dialog.close();});
dialog.addEventListener('click', e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
