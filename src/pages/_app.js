//import '../styles.css'
import Head from "next/head";
import { ThemeProvider } from 'emotion-theming'
import {UserContextProvider} from "../context/UserContext";
import {Layout} from "../components/layout";
//import theme from '@rebass/preset'

const theme = {
    breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  colors: {
      secondary: "#EEEDE8",
      primary: '#DA5C46',
    },
  space: [
    0, 4, 8, 16, 32, 64, 128, 256
  ],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)'
  },
  variants: {
  },
  text: {

  },
  radii: {
      default: 12,
    }   
};

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <UserContextProvider>
        <Head>
            <title>Krets.</title>
        </Head>
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </UserContextProvider>;
}
