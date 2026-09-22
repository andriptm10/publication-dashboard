# STEAM-Voc Edu Publication Dashboard

PWA dashboard for monitoring publications. Deploy this folder to Netlify from a private GitHub repository.

## Deploy

1. Create a private GitHub repository.
2. Push this folder to the repository.
3. In Netlify, choose **Add new site** then **Import an existing project**.
4. Connect GitHub and select the private repository.
5. Use these settings:
   - Build command: leave empty
   - Publish directory: `.`
6. Deploy.

## iPhone install

1. Open the Netlify URL in Safari.
2. Tap Share.
3. Choose **Add to Home Screen**.

## Viewer deployment

This release is a read-only publication dashboard. Login, editor actions, stored admin sessions, and Google Apps Script write integration are removed.

Publication data is loaded from `data/publications.json`. Update that file and push to GitHub to publish data changes through Netlify. Embedded data is used if the dataset cannot be loaded.

Netlify settings: production branch `main`, no build command, publish directory `.`.
