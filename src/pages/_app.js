import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import { UserContextProvider } from '../context/UserContext'
import { Layout } from '../components/layout'
import { KretsTheme } from '../components/theme'
import 'tippy.js/dist/tippy.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <UserContextProvider>
    <Head>
      <title>Krets.</title>
      <link
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
        rel='stylesheet'
      />
      <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800' rel='stylesheet' />
      <link rel='icon' href='logo.svg' sizes='any' type='image/svg+xml' />
    </Head>
    <ThemeProvider theme={KretsTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </UserContextProvider>
}
