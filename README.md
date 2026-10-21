# CRWU · Come Run With Us

One-page site for the CRWU run club: who we are and a sign-up form.
Plain HTML, CSS and JavaScript. No build step.

## Hosting

Cloudflare Pages, connected to this repo. Every push to `main` goes live.

- Framework preset: None
- Build command: (blank)
- Build output directory: `/`

Security headers live in `_headers`.

## Sign-ups

The form posts to a Google Apps Script web app that appends a row to the
"CRWU Sign-ups" Google Sheet. The script is in `google-sheet-script.gs`; its
deployed URL is `SHEET_URL` in `app.js`.
