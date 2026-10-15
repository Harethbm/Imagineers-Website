# Imagineers Digital Systems — Website 2026

Static site for GitHub Pages (custom domain in `CNAME`: www.imagineerscx.com). No build step: upload the files and it works.

## Where to edit what

| To change… | Edit this |
|---|---|
| Menu, email, address, hours, LinkedIn, footer text (all pages at once) | `assets/js/site.js` — the `SITE` block at the top |
| Colours, fonts, spacing (all pages at once) | `assets/css/site.css` — the "Design tokens" block at the top |
| Hero ribbon colours, speed, sheen | `assets/js/ribbon.js` — the `RIBBON` block at the top |
| Ribbon shape (the slanted edge) | `assets/css/site.css` — `.ribbon-wrap { clip-path: … }` |
| Page text | the page's own `.html` file (`index.html`, `pages/*.html`) |
| Logo | replace `images/logo-nav.png` (or point `SITE.logo` to a new file) |
| Social share image | `images/og-image.jpg` (1200 × 630) |

## Photos: upload and position

1. Put the photo in `images/photos/` with the name listed in `images/photos/PUT-PHOTOS-HERE.txt`
   (or change the `src` of the `<img>` inside any `<figure class="photo">`).
2. Position it with the line on its `<figure>` tag:
   `style="--x:50%; --y:50%; --zoom:1"`
   * `--x` 0% = show the left edge, 100% = the right edge
   * `--y` 0% = show the top, 100% = the bottom
   * `--zoom` 1 = normal, 1.2 = 20% closer
3. Easier: open any page with `?edit` at the end of the address
   (e.g. `https://www.imagineerscx.com/pages/about.html?edit`). Drag the photo,
   scroll on it to zoom, press **Copy style**, and paste over the `style="…"` line in the HTML.

Each photo slot is marked in the HTML with a `<!-- PHOTO SLOT -->` comment.

## Facts and sources

Every figure on the site has a numbered source listed under it. If you add a number, add its source the same way, or leave the number out.

## Old links

`home.html` and `pages/zkb.html` redirect to the new pages, so existing links keep working.

## Publishing on GitHub

Replace the contents of the `Imagineers-Website` repository with these files (keep `CNAME`), commit, and GitHub Pages republishes automatically.
