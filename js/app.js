'use strict';

const drawStylesheet = document.createElement('link');
drawStylesheet.rel = 'stylesheet';
drawStylesheet.href = 'css/draw.css';
document.head.append(drawStylesheet);

const yearTarget = document.querySelector('#current-year');
const drawButton = document.querySelector('#draw-button');
const drawAgainButton = document.querySelector('#draw-again-button');
const resultCard = document.querySelector('#result-card');
const resultNumber = document.querySelector('#result-number');
const resultTitle = document.querySelector('#result-title');
const resultDescription = document.querySelector('#result-description');
const resultMessage = document.querySelector('#result-message');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear().toString();
}

let previousIndex = -1;

function getRandomIndex(length) {
  if (length <= 1) return 0;

  let index;
  if (window.crypto && window.crypto.getRandomValues) {
    const randomValue = new Uint32Array(1);
    do {
      window.crypto.getRandomValues(randomValue);
      index = randomValue[0] % length;
    } while (index === previousIndex);
  } else {
    do {
      index = Math.floor(Math.random() * length);
    } while (index === previousIndex);
  }

  return index;
}

function drawHexagram() {
  if (!Array.isArray(window.HEXAGRAMS) || window.HEXAGRAMS.length !== 64) {
    return;
  }

  const index = getRandomIndex(window.HEXAGRAMS.length);
  const hexagram = window.HEXAGRAMS[index];
  previousIndex = index;

  resultNumber.textContent = `第 ${hexagram.number} 卦`;
  resultTitle.textContent = hexagram.name;
  resultDescription.textContent = hexagram.description;
  resultMessage.textContent = hexagram.message;
  resultCard.hidden = false;

  window.requestAnimationFrame(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    resultTitle.focus({ preventScroll: true });
  });
}

if (resultTitle) {
  resultTitle.tabIndex = -1;
}

if (drawButton) {
  drawButton.addEventListener('click', drawHexagram);
}

if (drawAgainButton) {
  drawAgainButton.addEventListener('click', drawHexagram);
}
