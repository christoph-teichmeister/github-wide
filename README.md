# GitHub: Full Width

Tampermonkey / Violentmonkey userscript that removes GitHub's max-width limit, so issues, PRs, repos and settings use the full window width instead of a narrow centered column.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or Violentmonkey).
2. Open [github-wide.user.js](https://raw.githubusercontent.com/christoph-teichmeister/github-wide/main/github-wide.user.js) and click **Install**.

Updates come automatically through `@updateURL`.

## Settings

Tampermonkey icon → **GitHub Wide** → **Max width: … (change)**. Enter `none` (full window), a pixel value like `1800px`, or a viewport share like `90vw`. The page reloads with the new width.

## How it works

The script widens only what GitHub itself caps. It marks every element whose native `max-width` is a fixed layout width (1000 px or more) and overrides just those. Pages GitHub already shows full width, like project boards, stay as they are. GitHub renders pages client-side, so the script rescans after DOM changes.

## License

MIT
