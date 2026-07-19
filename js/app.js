'use strict';

const yearTarget = document.querySelector('#current-year');
const toast = document.querySelector('.toast');
const comingSoonLinks = document.querySelectorAll('[data-coming-soon="true"]');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear().toString();
}

let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 3600);
}

comingSoonLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('心靈抽籤功能即將開放，謝謝你的停留。');
  });
});
