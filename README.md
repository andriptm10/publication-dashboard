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

## Research metrics

The dashboard displays Scopus Author ID `57222618904` and Google Scholar ID `825itBQAAAAJ`. The Netlify function at `/api/research-metrics` refreshes both h-index values and caches results for six hours.

Configure these Netlify environment variables for live updates:

- `ELSEVIER_API_KEY` for the official Scopus Author Retrieval API.
- `SERPAPI_KEY` for the Google Scholar Author API.

If either key is unavailable or its provider cannot be reached, the dashboard displays the latest verified snapshot instead of leaving the metric empty.
