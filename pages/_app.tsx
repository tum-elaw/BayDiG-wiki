import React, { useEffect } from 'react'
import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import { useTheme, ThemeProvider } from '@primer/components'
import { defaultThemeProps, getThemeProps } from 'components/lib/getThemeProps'

import '../stylesheets/index.scss'

import events from 'javascripts/events'
import experiment from 'javascripts/experiment'
import setNextEnv from 'javascripts/set-next-env'

type MyAppProps = AppProps & { csrfToken: string; themeProps: typeof defaultThemeProps }
const MyApp = ({ Component, pageProps, csrfToken, themeProps }: MyAppProps) => {
  useEffect(() => {
    events()
    experiment()
    setNextEnv()
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Wiki für das Bayerische Digitalgesetz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="alternate icon" type="image/png" href="/assets/images/site/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/site/favicon.svg" />

        <meta name="google-site-verification" content="xAYFpHTE4DswkodoRhAJ0UUq1z1LW7J773DHPNThPGA" />

        <meta name="csrf-token" content={csrfToken} />
      </Head>
      <ThemeProvider>
        <SetTheme themeProps={themeProps} />
        <div className='pl-4 py-2 color-bg-warning'><span className='f5'><b>Archivseite</b> (Projektabschluss im März 2023, die Inhalte werden nicht mehr aktualisiert.) </span></div>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const req: any = ctx.req

  return { ...appProps, themeProps: getThemeProps(req), csrfToken: req?.csrfToken?.() || '' }
}

const SetTheme = ({ themeProps }: { themeProps: typeof defaultThemeProps }) => {
  // Cause primer/components to re-evaluate the 'auto' color mode on client side render
  const { setColorMode } = useTheme()
  useEffect(() => {
    setTimeout(() => {
      setColorMode(themeProps.colorMode as any)
    })
  }, [])
  return null
}

export default MyApp
