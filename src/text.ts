import LocalizedStrings from "react-localization";

const strings = (config: {en: any, no: any}) => 
    new LocalizedStrings(config);

export const intro = strings({
    en: {
        create: "Creating a page on Krets is fast!",
        visiting: "Your audience visits your site, with a link or a QR-code",
        insight: "Gain insight!"
    },
    no: {
        create: "Å lage en Krets-side er kjapt!",
        visiting: "Ditt publikum besøker din side, med link eller QR-kode",
        insight: "Få innsikt!"
    }
});

export const response = strings({
    en: {
        header: "Give feedback to",
        placeholder: "Optional text",
        button: "Send",
        chooseSmiley: "You have to choose a smiley 😃",
        error: "Oh no! Something wrong happened 😧" 
    },
    no: {
        header: "Gi tilbakemelding til",
        placeholder: "Valgfri tekst",
        button: "Send",
        chooseSmiley: "Velg en smiley 😃",
        error: "Auda, her skjedde det en feil 😧" 
    }
});

export const page = strings({
    en: {
        header: "Scan to give feedback to",
        loading: "(Loading...)"
    },
    no: {
        header: "Scan og gi tilbakemelding til",
        loading: "(Laster...)"
    }
})

export const buttons = strings({
    en: {
        logout: "Log out", 
        login: "Log in", 
        getStarted: "Get started!",
    }, 
    no: {
        login: "Logg ut",
        login: "Logg inn",
        getStarted: "Kom i gang!",
    }
})