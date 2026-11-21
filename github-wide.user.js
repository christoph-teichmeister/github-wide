// ==UserScript==
// @name         GitHub Wide
// @namespace    https://github.com/christoph-teichmeister/github-wide
// @version      1.0.0
// @description  Removes the max-width limit on GitHub pages so content uses the full window width.
// @author       christoph-teichmeister
// @match        https://github.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/christoph-teichmeister/github-wide/main/github-wide.user.js
// @updateURL    https://raw.githubusercontent.com/christoph-teichmeister/github-wide/main/github-wide.user.js
// ==/UserScript==

GM_addStyle(`
  /* Classic layout containers */
  .container, .container-md, .container-lg, .container-xl,
  .application-main .container-xl,

  /* React PageLayout (class names carry hashes, so match by prefix) */
  [class*="PageLayout-PageLayoutWrapper"],
  [class*="PageLayout-PageLayoutContent"],
  [class*="PageLayout-ContentWrapper"],
  [class*="PageLayout-Content-"],
  [class*="PageLayout-Header"],

  /* Issue / PR view */
  [class*="contentAndSidebarWrapper"],
  [class*="IssueContent"] {
    max-width: none !important;
  }
`);
