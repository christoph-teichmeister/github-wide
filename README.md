# GitHub: Full Width

Tampermonkey / Violentmonkey userscript that removes GitHub's max-width limit, so issues, PRs, repos and settings use the full window width instead of a narrow centered column.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or Violentmonkey).
2. Open [github-wide.user.js](https://raw.githubusercontent.com/christoph-teichmeister/github-wide/main/github-wide.user.js) and click **Install**.

Updates come automatically through `@updateURL`.

## Settings

Tampermonkey icon → **GitHub Wide** → **Max width: … (change)**. Enter `none` (full window), a pixel value like `1800px`, or a viewport share like `90vw`. The page reloads with the new width.

## How it works

One CSS block sets `max-width` (default `none`) on GitHub's layout containers. GitHub's React classes carry build hashes (`prc-PageLayout-Content-xWL-A`), so the script matches them by prefix. If GitHub renames a container and a page goes narrow again, open an issue with the page URL.

## License

MIT
