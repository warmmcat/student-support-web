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
const resultLove = document.querySelector('#result-love');
const resultStudy = document.querySelector('#result-study');
const resultRelationships = document.querySelector('#result-relationships');
const resultStress = document.querySelector('#result-stress');
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

function formatSection(text, category) {
  if (typeof text !== 'string') return '';

  const cleaned = text.trim().replace(/^[\p{Extended_Pictographic}\uFE0F\s]+/u, '');
  const prefix = `${category}：`;

  if (!cleaned.startsWith(prefix)) return cleaned;

  return cleaned.slice(prefix.length).trim();
}

function setResultContent(target, text, category) {
  if (!target) return;
  target.textContent = formatSection(text, category);
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
  setResultContent(resultDescription, hexagram.description, '說明');
  setResultContent(resultLove, hexagram.love, '關於感情');
  setResultContent(resultStudy, hexagram.study, '關於課業');
  setResultContent(resultRelationships, hexagram.relationships, '關於人際');
  setResultContent(resultStress, hexagram.stress, '壓力調適');
  setResultContent(resultMessage, hexagram.message, '給同學的一句話');
  resultCard.hidden = false;

  window.requestAnimationFrame(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
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