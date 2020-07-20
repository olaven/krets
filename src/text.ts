import LocalizedStrings from "react-localization";

const strings = (config: { en: any, no: any }) =>
    new LocalizedStrings(config);

export const intro = strings({
    en: {
        create: "Creating a page on Krets is fast!",
        visiting: "Your audience visits your site, with a link or a QR-code",
        insight: "Gain insight!",
        earlyVersionDisclaimer: "Krets is under development. Changes will occur. Data may be deleted without notice."
    },
    no: {
        create: "Å lage en Krets-side er kjapt!",
        visiting: "Ditt publikum besøker din side, med link eller QR-kode",
        insight: "Få innsikt!",
        earlyVersionDisclaimer: "Krets er under utvikling. Endringer vil forekomme. Data kan slettes uten forvarsel."
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
        error: "Auda, her skjedde det en feil 😧",
        thanks: "Tusen takk!",
    }
});

export const page = strings({
    en: {
        header: "Give feedback to",
        loading: "(Loading...)"
    },
    no: {
        header: "Gi tilbakemelding til",
        loading: "(Laster...)"
    }
})

export const buttons = strings({
    en: {
        logout: "Log out",
        login: "Log in",
        getStarted: "Get started!",
        toAdmin: "Received feedback",
        toQR: "My QR-code",
        toPage: "Give feedback",
        toSettings: "Settings",
    },
    no: {
        logout: "Logg ut",
        login: "Logg inn",
        getStarted: "Kom i gang!",
        toAdmin: "Mottatte tilbakemeldinger",
        toQR: "Min QR-kode",
        toPage: "Gi tilbakemelding",
        toSettings: "Instillinger",
    }
});

export const tooltips = strings({
    en: {
        helpButton: "Show help",
        understoodButton: "Understood!",
        pageCreatorInput: "Enter a name related to the thing you want to get feedback on.",
        pageCreatorButton: "Create your page!",
        pageList: "The pages you create show up here"
    },
    no: {
        helpButton: "Vis hjelp",
        understoodButton: "Skjønner!",
        pageCreatorInput: "Lag en Krets-side som representerer det du vil ha tilbakemelding på!",
        pageCreatorButton: "Klikk her for å lage siden",
        pageList: "Sidene du lager dukker opp her"
    }
})

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
        error: "En feil oppsto😐"
    }
});


export const categoryCreator = strings({
    en: {
        placeholder: "Enter the page name",
        button: "Create page",
        error: "An error occured😐"
    },
    no: {
        placeholder: "Kategoriens navn",
        button: "Lag kategori",
        error: "En feil oppsto😐"
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

export const settings = strings({
    en: {
        heading: "Settings page for",
        loading: "Loading settings page..",
        changeNameButton: "Change name",
        changeNameError: "Something wrong happened when updating the name..",
        deletePageButton: "Delete page.",
        deleteWarning: "Are you sure? This permanently deletes this page, including all responses. Deletion cannot be undone.",
        deleteConfirmation: "I am sure about this.",
        deleteCancelation: "Don't delete.",
        deleteError: "An error occured when deleting.."
    },
    no: {
        heading: "Instillinger for",
        loading: "Laster instillinger..",
        changeNameButton: "Endre navn",
        changeNameError: "Det skjedde en feil med oppdatering av navn..",
        deleteButton: "Slett side.",
        deleteWarning: "Er du sikker? Siden og all tilbakemelding slettes permanent. Du kan ikke gjøre om dette.",
        deleteConfirmation: "Jeg er helt sikker.",
        deleteCancelation: "Ikke slett.",
        deleteError: "En feil oppsto med slettingen.."
    }
})

export const compareSelect = strings({
    en: {
        heading: "Compare pages",
        choose: "Choose pages"
    },
    no: {
        heading: "Sammenlign sider",
        choose: "Velg sider"
    }
})

//NOTE: nothing yet 
export const moodGraph = strings({
    en: {
        yLabel: "Average score",
        xLabel: "Page"
    },
    no: {
        yLabel: "Gjennomsnitlig score",
        xLabel: "Side"
    }
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