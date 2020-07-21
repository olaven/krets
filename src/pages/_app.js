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

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, TAWKTO_EMBED_SOURCE }) {

  console.log(TAWKTO_EMBED_SOURCE);
  return <UserContextProvider>
    <Head>
      <title>Krets.</title>
      <link
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
        rel='stylesheet'
      />
      <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800' rel='stylesheet' />
      <link rel='icon' href='logo.svg' sizes='any' type='image/svg+xml' />

      {/* START - add tawk.to chat  */}
      <script dangerouslySetInnerHTML={{
        __html: `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='${TAWKTO_EMBED_SOURCE}';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      ` }} ></script>
      {/* END - add tawk.to chat  */}


    </Head>
    <ThemeProvider theme={KretsTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </UserContextProvider>
}
