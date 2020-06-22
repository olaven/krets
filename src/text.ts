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
        error: "Oh no! Something wrong happened 😧", 
        thanks: "Thank you!",
    },
    no: {
        header: "Gi tilbakemelding til",
        placeholder: "Valgfri tekst",
        button: "Send",
        chooseSmiley: "Velg en smiley 😃",
        error: "Auda, her skjedde det en feil 😧" , 
        thanks: "Tusen takk!",
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
        logout: "Logg ut",
        login: "Logg inn",
        getStarted: "Kom i gang!",
    }
});

export const myPages = strings({
    en: {
        header: "My Krets-pages:"
    }, 
    no: {
        header: "Mine Krets-sider:"
    }
}); 

export const pageCreator = strings({
    en: {
        preview: "Your page:",
        placeholder: "Enter the page name", 
        button: "Create page",
        error: "An error occured😐"
    }, 
    no: {
        preview: "Din side:",
        placeholder: "Sidens navn", 
        button: "Lag side", 
        error: "An error occured😐"
    }
}); 

export const adminPage = strings({
    en: {
        loading: "Loading admin page...", 
        notOwning: "You do not own this page."
    }, 
    no: {
        loading: "Laster adminside...",
        notOwning: "Denne siden eier du ikke."
    }
}); 

//NOTE: nothing yet 
export const moodGraph = strings({
    en: {}, 
    no: {}
}); 

export const responseList = strings({
    en: {
        loading: "Loading responses..", 
        noResponses: "No responses yet"
    }, 
    no: {
        loading: "Laster responser..", 
        noResponses: "Ingen responser enda"
    }
})