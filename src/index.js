import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import App from './app'
import routes from './routes'
import { matchPath } from 'react-router'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

async function handleRequest(event) {
  const url = new URL(event.request.url)
  const path = url.pathname
  const route = routes.find((route) => matchPath(path, route))

  if (route) {
    let ctx = {
      component: route.component,
      location: { pathname: url.pathname, search: url.search },
      data: {},
    }

    if (ctx.component.getInitialProps) {
      ctx.data = await ctx.component.getInitialProps(ctx)
    }

    const markup = ReactDOMServer.renderToString(
      <App location={ctx.location} data={ctx.data} />
    )

    return new Response(
      `<html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta charset="utf-8"/>
            <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            <div id="app">${markup}</div>
            <script src="/worker.js"></script>
            <script> window.__INITIAL_DATA__ = ${JSON.stringify(
              ctx.data
            )}</script>
          </body>
        </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  }

  try {
    return await getAssetFromKV(event)
  } catch (e) {
    const staticCacheName = 'workers-site-react-pwa-v1'
    const cache = await caches.open(staticCacheName)
    let response = await cache.match(event.request)

    if (!response) {
      response = await fetch(event.request)
      event.waitUntil(cache.put(event.request, response.clone()))

      if (response.status && !response.ok) {
        let pathname = new URL(event.request.url).pathname
        response = new Response(`"${pathname}" not found`, {
          status: 404,
          statusText: 'not found',
        })
      }
    }

    return response
  }
}

self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

if (typeof window !== 'undefined') {
  window.addEventListener('load', function () {
    const app = document.querySelector('#app')

    if (window.__INITIAL_DATA__) {
      ReactDOM.hydrate(<App {...window.__INITIAL_DATA__} />, app)
    } else {
      ReactDOM.render(<App />, app)
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/worker.js').then(
        function (registration) {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        },
        function (err) {
          console.log('ServiceWorker registration failed: ', err)
        }
      )
    }
  })
}
