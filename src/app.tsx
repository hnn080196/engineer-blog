import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { MetaProvider, Link, Meta } from '@solidjs/meta'
import { Suspense } from 'solid-js'
import './styles/global.css'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta name="theme-color" content="#1a1a1a" />
          <Link rel="icon" href="/favicon.ico" />
          <Link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
