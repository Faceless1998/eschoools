import '../styles/globals.css'
import {
  CssBaseline,
  LinearProgress,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import { muiTheme } from 'app/theme'
import type { AppProps } from 'next/app'

import { CheckLoginProvider, useAuthContext } from 'providers/login-provider'
import { QueryClient, QueryClientProvider, useIsFetching } from 'react-query'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import NextNProgress from 'nextjs-progressbar'

import { Navbar } from 'shared/navbar'
import Head from 'next/head'

import React from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
})

const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching()

  return isFetching ? <LinearProgress color="primary" /> : null
}

const LoggedManifest = () => {
  const { user } = useAuthContext()
  if (!user) return null
  return <Navbar />
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="https://cyso.ge/logo.png"
          style={{ backgroundColor: 'red' }}
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <CheckLoginProvider>
              <ToastContainer position="bottom-right" />
              <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  duration: 1000,
                  error: {
                    duration: 3000,
                    position: 'top-center',
                  },
                  success: {
                    duration: 2500,
                    position: 'top-center',
                  },
                }}
              />
              <GlobalLoadingIndicator />
              <NextNProgress
                height={4}
                color="#2e0b80"
                options={{ showSpinner: false }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Head>
                  <title>ონლაინ სწავლების პლატფორმა - Eschools online</title>
                </Head>
                <LoggedManifest />
                <Component {...pageProps} />
              </LocalizationProvider>
            </CheckLoginProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default MyApp
