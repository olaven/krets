import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js'
import { UserContextProvider } from '../context/UserContext'
import { Layout } from '../components/layout'
import { KretsTheme } from '../components/theme'
import 'tippy.js/dist/tippy.css';


MyApp.getInitialProps = async (context) => {
  return {
    TAWKTO_EMBED_SOURCE: process.env.TAWKTO_EMBED_SOURCE,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
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
export default function MyApp({ Component, pageProps, TAWKTO_EMBED_SOURCE, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }) {

  return <UserContextProvider>
    <Head>

      <title>Krets</title>
      <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800' rel='stylesheet' />
      <link rel='icon' href='logo.svg' sizes='any' type='image/svg+xml' />

      <meta property="og:image" content="https://www.mugshotbot.com/m?url=https://krets.app"></meta>
      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta property="og:title" content="Krets Feedback"></meta>

      <TawkToEmbedding source={TAWKTO_EMBED_SOURCE} />

      <style jsx global>{`
        :global(body) {
          margin: 0; 
        }
      `}</style>

    </Head>
    <ThemeProvider theme={KretsTheme}>
      {/* I should consider moving Stripe-Component (Elements) down to a custom context or similar */}
      <Elements stripe={loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Elements>
    </ThemeProvider>
  </UserContextProvider>
}
