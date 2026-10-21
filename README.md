# CRWU · Come Run With Us

One-page site for the CRWU run club: who we are and a sign-up form.
Plain HTML, CSS and JavaScript. No build step.

## Hosting

Cloudflare Workers (static assets) at https://crwu.club, connected to this repo.
Every push to `main` goes live.


Security headers live in `_headers`; `.assetsignore` keeps the repo notes off the site.

## Sign-ups

The form posts to a Google Apps Script web app that appends a row to the
"CRWU Sign-ups" Google Sheet. The script is in `google-sheet-script.gs`; its
deployed URL is `SHEET_URL` in `app.js`.
