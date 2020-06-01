import Head from "next/head";
import {ThemeProvider} from 'emotion-theming'
import {UserContextProvider} from "../context/UserContext";
import {Layout} from "../components/layout";
import {KretsTheme} from "../components/theme";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}) {
    return <UserContextProvider>
        <Head>
            <title>Krets.</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"/>
        </Head>
        <ThemeProvider theme={KretsTheme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </UserContextProvider>;
}
