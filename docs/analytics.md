# Analytics

The site uses [Umami Cloud](https://cloud.umami.is). It sets no cookies, so it runs for every visitor without consent.

The tracker is configured in `nuxt.config.ts` under `scripts.registry.umamiAnalytics`. It only counts visits on `frites.dev`, so local and Firebase preview visits are ignored. If the site ever answers on another domain (for example `www.frites.dev`), add it to `domains`.

## Where to look in the dashboard

- **Visitors, page views, referrers, countries, devices**: the website overview.
- **Which sections people read**: Events > `section-read`.
  - `section`: the section id (`top`, `work`, `clients`, `about`, `stack`, `contact`).
  - `duration`: how long it stayed on screen (`2-10s`, `10-30s`, `30-60s`, `60s+`).
- **Which links people click**: Events > `link-click`.
  - `target`: `email`, or the hostname of the site (`github.com`, `linkedin.com`, ...).

## How the events work

`section-read` is sent each time a section stays in view for at least 2 seconds. A section is in view when it covers half of the screen, or half of itself when it is shorter than the screen. Scrolling past quickly sends nothing. See `app/composables/useSectionReadTracking.ts`.

Every section rendered with `AppSection` is tracked automatically. Any other section needs a template ref and a call to `useSectionReadTracking`, like `Section/Hero.vue`.

`link-click` comes from one click listener on the whole page, set up in `app/app.vue`. See `app/composables/useAnalytics.ts`.

## Test the events locally

The tracker ignores `localhost`. To check events locally, temporarily add `'localhost'` to `domains`, run the site, and watch the `POST .../api/send` requests in the browser network panel. Remove it before committing, or your own visits get counted.
