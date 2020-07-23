import Head from 'next/head'
import { NextScript } from "next/document";
import { ThemeProvider } from 'emotion-theming'
import { UserContextProvider } from '../context/UserContext'
import { Layout } from '../components/layout'
import { KretsTheme } from '../components/theme'
import 'tippy.js/dist/tippy.css';


MyApp.getInitialProps = async (context) => {
  return {
    TAWKTO_EMBED_SOURCE: process.env.TAWKTO_EMBED_SOURCE
  }
}

const TawkToEmbedding = ({ source }) => <script type="application/javascript" dangerouslySetInnerHTML={{
  __html: `
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
    
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='${source}';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  })();
` }} ></script>

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, TAWKTO_EMBED_SOURCE }) {

  return <UserContextProvider>
    <Head>

      <title>Krets.</title>
      <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800' rel='stylesheet' />
      <link rel='icon' href='logo.svg' sizes='any' type='image/svg+xml' />

      <TawkToEmbedding source={TAWKTO_EMBED_SOURCE} />

    </Head>
    <ThemeProvider theme={KretsTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </UserContextProvider>
}
