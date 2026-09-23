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

## Editor access

The public dashboard opens in viewer mode. An editor can log in to add, update, and delete publications.

Publication data is loaded from `data/publications.json`. Editor changes are saved in that browser's local storage, so they do not update the deployed dataset for other visitors. Update `data/publications.json` and push to GitHub for shared production data changes.

Netlify settings: production branch `main`, no build command, publish directory `.`.
