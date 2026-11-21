// ==UserScript==
// @name         GitHub: Full Width
// @namespace    https://github.com/christoph-teichmeister/github-wide
// @version      2026.11.1
// @description  Removes the max-width limit on GitHub pages so content uses the full window width (configurable).
// @author       christoph-teichmeister
// @match        https://github.com/*
// @icon         https://raw.githubusercontent.com/christoph-teichmeister/github-wide/refs/heads/main/icon.svg
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/christoph-teichmeister/github-wide/main/github-wide.user.js
// @updateURL    https://raw.githubusercontent.com/christoph-teichmeister/github-wide/main/github-wide.user.js
// ==/UserScript==

// Max content width: "none" (full window), a pixel value ("1800px") or a
// viewport share ("90vw"). Use vw, not %: the containers are nested, so % compounds.
const maxWidth = GM_getValue('maxWidth', 'none');

GM_registerMenuCommand(`Max width: ${maxWidth} (change)`, () => {
  const value = prompt('Max content width: none, e.g. 1800px or 90vw', maxWidth);
  if (value === null) return;
  const v = value.trim() || 'none';
  if (!CSS.supports('max-width', v)) return alert(`"${v}" is not a valid CSS width.`);
  GM_setValue('maxWidth', v);
  location.reload();
});

// Only widen what GitHub itself caps. Class names change and differ per page
// (contentContainer__…, Container__…, container-xl), so instead of a selector list
// we mark every div whose native max-width is a fixed layout width (>= 1000px).
// Pages GitHub already shows full width (project boards) have none and stay untouched.
// Dialogs are skipped: they have their own caps.
const MARK = 'data-gh-wide';
const MIN_CAP = 1000;

GM_addStyle(`
  [${MARK}] { max-width: ${maxWidth} !important; }

  /* Flex children default to min-width:auto and would grow past the window
     to fit long titles; let them shrink instead. */
  [class*="PageLayout-PageLayoutContent"],
  [class*="PageLayout-Content-"] {
    min-width: 0 !important;
  }
`);

function mark() {
  for (const el of document.querySelectorAll(`body div:not([${MARK}])`)) {
    const cap = getComputedStyle(el).maxWidth;
    if (cap.endsWith('px') && parseFloat(cap) >= MIN_CAP && !el.closest('dialog, [role="dialog"]')) {
      el.setAttribute(MARK, '');
    }
  }
}

// GitHub renders client-side (React, Turbo), so rescan after DOM changes.
// ponytail: full div scan per burst (~50 ms on big pages), debounced; narrow it if it ever lags.
let timer;
new MutationObserver(() => {
  clearTimeout(timer);
  timer = setTimeout(mark, 150);
}).observe(document.documentElement, { childList: true, subtree: true });
