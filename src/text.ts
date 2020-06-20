import LocalizedStrings from "react-localization";

export const intro = new LocalizedStrings({
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

export const response = new LocalizedStrings({
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

export const text = new LocalizedStrings({
    en: {
        frictionless: "frictionless feedback",
    },
    no: {
        frictionless: "friksjonsfri tilbakemelding"
    }
});