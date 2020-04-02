# Workers Site React PWA

Example of React running in the client and a service worker, pre-rendered through a Cloudflare Worker.

This is based off of [Stefan Judis’ original example](https://github.com/stefanjudis/react-in-a-worker) and makes it work with [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) for hosting static assets.

## Demo

https://workers-site-react-pwa.rppld.workers.dev/

## Deploy with Cloudflare Workers Sites

- Get a [Workers Unlimited](https://workers.cloudflare.com/sites#plans) plan (required for Workers Sites)
- `$ npm i @cloudflare/wrangler -g`
- Clone this repository and `$ cd` into the folder
- Add your account ID inside `wrangler.toml`
- `$ wrangler publish`

## Links

- [Serverless Progressive Web Apps using React with Cloudflare Workers](https://blog.cloudflare.com/serverless-pwa-react-cloudflare-workers/)
- [React in a worker](https://github.com/stefanjudis/react-in-a-worker)
- [Caching Files with Service Worker](https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker)
