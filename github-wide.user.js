// ==UserScript==
// @name         GitHub: Full Width
// @namespace    https://github.com/christoph-teichmeister/github-wide
// @version      1.3.0
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

GM_addStyle(`
  /* Classic layout containers */
  .container, .container-md, .container-lg, .container-xl,

  /* React PageLayout (class names carry hashes, so match by prefix) */
  [class*="PageLayout-PageLayoutWrapper"],
  [class*="PageLayout-PageLayoutContent"],
  [class*="PageLayout-ContentWrapper"],
  [class*="PageLayout-Content-"],
  [class*="PageLayout-Header"],

  /* Issue / PR view */
  [class*="contentAndSidebarWrapper"],
  [class*="IssueContent"],
  [class*="contentContainer"],
  [class*="PageHeader-Title"] {
    max-width: ${maxWidth} !important;
  }

  /* Flex children default to min-width:auto and would grow past the window
     to fit long titles; let them shrink instead. */
  [class*="PageLayout-PageLayoutContent"],
  [class*="PageLayout-Content-"] {
    min-width: 0 !important;
  }
`);
