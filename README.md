# Done In One chatbot: GitHub Pages package

This package contains the chatbot from the supplied website snippet. The website loads only `launcher.js`. It creates an iframe pointing at `index.html`, which loads `chatbot.js`. The iframe keeps Tailwind, the widget's CSS, its IDs, and its JavaScript out of the website's page.

## Publish

1. Create a public GitHub repository, for example `archie-chatbot`.
2. Put `launcher.js`, `index.html`, `chatbot.js`, and `.nojekyll` in the repository root.
3. In repository **Settings → Pages**, set **Build and deployment → Deploy from a branch**, choose `main` and `/(root)`, then save.
4. Wait until Pages shows the published site URL. Open `https://YOUR-USERNAME.github.io/archie-chatbot/index.html` to preview the chatbot on its own.
5. Remove the entire old chatbot snippet from the website, including its Tailwind and Lucide tags, styles, HTML, and JavaScript. Paste this once in the site's body/footer code area, replacing the URL with the published one:

```html
<script src="https://YOUR-USERNAME.github.io/archie-chatbot/launcher.js" defer></script>
```

For an organization repository, use its organization's GitHub Pages URL. If the repository name or custom domain differs, use the exact published Pages URL and append `/launcher.js`.

## Update

Edit `chatbot.js` in the same repository and commit to `main`. GitHub Pages republishes from that branch. Visitors loading a page after publication receive the revised chatbot JavaScript; the website snippet stays the same. For layout or styling changes, edit `index.html`. Deployment takes some time; an already open page retains its loaded version until refreshed.

## What changed

- The chatbot runs inside an iframe to isolate its CSS, Tailwind runtime, global JavaScript, and DOM from the host website.
- The launcher expands the iframe when the panel opens and shrinks it when it closes.
- The launcher supplies the actual host page URL, title, and referrer for the existing webhook payloads. It also keeps the three existing visitor/name storage values on the host site, with a fallback if browser storage is blocked.
- The two existing webhook URLs and the chatbot's text and flows remain in `chatbot.js`.

## Checks before going live

Check a desktop and mobile page, including open/close, consultation and candidate forms, Ask a Question, notification bubble, and your n8n submissions. Confirm the website's Content Security Policy, if present, permits the Pages domain for `script-src` and `frame-src`, and that your n8n webhook permits requests from the published Pages origin. The direct `index.html` preview has no host page context, so verify attribution on the real website.

GitHub Pages publishes these files publicly. Do not put API secrets or private patient information in the repository.
