import LocalizedStrings from "react-localization";

const strings = (config: { en: any, no: any }) =>
    new LocalizedStrings(config);

export const intro = strings({
    en: {
        create: "Creating a page on Krets is fast!",
        visiting: "Your audience visits your site, with a link or a QR-code",
        insight: "Gain insight!",
        earlyVersionDisclaimer: "Krets is under development, changes will occur 👨‍💻. Data may be deleted without notice.",
        termsOfUse: "terms of use",
        privacyPolicy: "privacy policy",
        acceptPrefix: "Users accept Krets'",
        acceptInfix: "and",
        acceptSuffix: "📝"
    },
    no: {
        create: "Å lage en Krets-side er kjapt!",
        visiting: "Ditt publikum besøker din side, med link eller QR-kode",
        insight: "Få innsikt!",
        earlyVersionDisclaimer: "Krets er under utvikling, endringer vil forekomme 👨‍💻. Data kan slettes uten forvarsel.",
        termsOfUse: "vilkår",
        privacyPolicy: "personvernserklæring",
        acceptPrefix: "Brukere aksepterer Krets'",
        acceptInfix: "og",
        acceptSuffix: "📝"
    }
});

//TODO: move more of the text from `upgrade` to this section
export const user = strings({
    en: {
        deleteButton: "Permanently delete account."
    },
    no: {
        deleteButton: "Slett kontoen din for godt."
    }
})

export const response = strings({
    en: {
        header: "Give feedback to",
        placeholder: {
            happy: "What did you like?",
            neutral: "What should've been different?",
            sad: "What did you dislike?"
        },
        button: "Send",
        chooseSmiley: "You have to choose a smiley 😃",
        error: "Oh no! Something wrong happened 😧",
        thanks: "Thank you!",
        prefixCustomQuestionCheckbox: "I want to answer",
        suffixCustomQuestionCheckbox: "questions",
        contactCheckbox: "I want to be contacted",
        contactPlaceholder: "Email or phone number",
        copyButton: {
            copy: "Copy link!",
            copied: "Link copied!"
        }
    },
    no: {
        header: "Gi tilbakemelding til",
        placeholder: {
            happy: "Hva likte du?",
            neutral: "Hva burde vært annerledes?",
            sad: "Hva mislikte du?"
        },
        button: "Send",
        chooseSmiley: "Velg en smiley 😃",
        error: "Auda, her skjedde det en feil 😧",
        thanks: "Tusen takk!",
        prefixCustomQuestionCheckbox: "Jeg vil svare på",
        suffixCustomQuestionCheckbox: "spørsmål",
        contactCheckbox: "Jeg vil bli kontaktet igjen",
        contactPlaceholder: "Epost eller telefonnummer",
        copyButton: {
            copy: "Kopier lenke!",
            copied: "Lenke kopiert!"
        }
    }
});

export const page = strings({
    en: {
        header: "Scan and give feedback to",
        loading: "(Loading...)",
        download: "Download!"
    },
    no: {
        header: "Scan og gi tilbakemelding til",
        loading: "(Laster...)",
        download: "Last ned"
    }
})

export const buttons = strings({
    en: {
        logout: "Log out",
        login: "Log in",
        myPage: "Account",
        aboutPage: "About",
        getStarted: "Get started!",
        toAdmin: "Overview",
        toQR: "QR-code",
        toPage: "Landing page",
        toSettings: "Settings",
        loadMore: "Load more",
    },
    no: {
        logout: "Logg ut",
        login: "Logg inn",
        myPage: "Konto",
        aboutPage: "Om",
        getStarted: "Kom i gang!",
        toAdmin: "Oversikt",
        toQR: "QR-kode",
        toPage: "Landingsside",
        toSettings: "Instillinger",
        loadMore: "Last flere",
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

export const myCategories = strings({
    en: {
        inDevelopmentWarning: "'Categories' is not a finished feature of Krets. It is unstable and should not be used yet :-)",
        header: "My Categories"
    },
    no: {
        inDevelopmentWarning: "'Kategorier' er ikke en ferdig funksjon i Krets. Det er ustabilt og bør ikke brukes enda :-)",
        header: "Mine kategorier"
    },
});

export const pageCreator = strings({
    en: {
        preview: "Your page:",
        placeholder: "Enter the page name",
        button: "Create page",
        error: "An error occured😐",
        conflict: "A page with this ID already exists"
    },
    no: {
        preview: "Din side:",
        placeholder: "Sidens navn",
        button: "Lag side",
        error: "En feil oppsto😐",
        conflict: "En side med denne ID-en finnes alt"
    }
});


export const categoryCreator = strings({
    en: {
        placeholder: "Enter the category name",
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
        contactDetails: "Contact details",
        loading: "Loading admin page...",
        notOwning: "You do not own this page."
    },
    no: {
        contactDetails: "Kontaktinformasjon",
        loading: "Laster adminside...",
        notOwning: "Denne siden eier du ikke."
    }
});

export const settings = strings({
    en: {
        heading: "Settings page for",
        loading: "Loading settings page..",
        changeNameHeader: "Update page name",
        changeNameButton: "Update name",
        changeTitleHeader: "Update page title",
        changeTitleButton: "Update title",
        changeNameError: "Something wrong happened when updating the name..",
        deletePageButton: "Delete page.",
        deleteWarning: "Are you sure? This permanently deletes this page, including all responses. Deletion cannot be undone.",
        deleteConfirmation: "I am sure about this.",
        deleteCancelation: "Don't delete.",
        deleteError: "An error occured when deleting..",
        questions: {
            heading: "Create upto 3 custom questions",
            placeholder: "Enter question",
            createButton: "Create new",
            updateButton: "Update",
            deleteButton: "Delete.",
            unstable: "Custom questions an unstable feature - it may change"
        }
    },
    no: {
        heading: "Instillinger for",
        loading: "Laster instillinger..",
        changeNameHeader: "Oppdater sidens navn",
        changeNameButton: "Oppdater navn",
        changeTitleHeader: "Oppdater sidens tittel",
        changeTitleButton: "Oppdater tittel",
        changeNameError: "Det skjedde en feil med oppdatering av navn..",
        deletePageButton: "Slett side.",
        deleteWarning: "Er du sikker? Siden og all tilbakemelding slettes permanent. Du kan ikke gjøre om dette.",
        deleteConfirmation: "Jeg er helt sikker.",
        deleteCancelation: "Ikke slett.",
        deleteError: "En feil oppsto med slettingen..",
        questions: {
            heading: "Lag inntil 3 egne spørsmål",
            placeholder: "Enter question",
            createButton: "Opprett",
            updateButton: "Oppdater",
            deleteButton: "Slett.",
            unstable: "'Egne spørsmål' er en ustabil funksjon - den kan endre seg"
        }
    }
})

export const compareSelect = strings({
    en: {
        heading: "Select pages",
        choose: "Choose pages"
    },
    no: {
        heading: "Velg flere sider",
        choose: "Velg sider"
    }
});

export const charts = strings({
    en: {
        lineChartCollapsible: "Show development over time",
        barChartCollapsible: "Show overall score",
        suggestion: {
            collapsible: "Suggest your own chart",
            label: "Your suggestion",
            error: "Something went wrong.. Try again later or contact us directly",
            send: "Send suggestion",
        }
    },
    no: {
        lineChartCollapsible: "Vis utvikling over tid",
        barChartCollapsible: "Vis samlet score",
        suggestion: {
            collapsible: "Foreslå en ny graf",
            label: "Ditt forslag",
            error: "Noe gikk galt.. Forsøk senere eller send oss en mail",
            send: "Send forslag",
        }
    }
});

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
        noResponses: "No responses yet",
    },
    no: {
        loading: "Laster responser..",
        noResponses: "Ingen responser enda",
    }
});

export const upgrade = strings({
    en: {
        heading: "Upgrade Krets!",
        inDevelopmentWarning: "Paying users will have access to more features than non-paying users in the future",
        choosePrice: "Velg denne 💡",
        priceChosen: "Chosen 🙌",
        pay: "Pay now",
        vat: "VAT included.",
        included: "included",
        responses: "responses",
        afterTier: "per response afterwards",
        loading: "Updating.. Thanks for our patience!",
        button: "Upgrade Krets",
        salesArgument: "That's why Krets has a low price for everyone creating something by themselves!",
        includedAsSubscriber: "for more functionality",
        thanks: {
            heading: "Thank you,",
            subscription: "You have this subscription: ",
            aboutFeedback: "Feedback is the only way to improve👊",
            aboutKrets: "Krets is a small and independent company, working to make feedback as accessible as possible, for as many people as possible.",
            contactPrefix: "Reach out at",
            contactSuffix: "👋",
            greetings: "- founder, developer, 👨‍💻 and everything in between"
        },
        back: "Back to Krets",
        cancel: "Cancel subscription",
        sure: "I am sure",
        notSure: "Back",
        cancellationError: "Something wrong happened 🤕 ",
        cancelContact: "Reach out",
        cancelSuffix: ", we'll get things right!"
    },
    no: {
        heading: "Oppgrader Krets!",
        inDevelopmentWarning: "I fremtiden vil oppgraderte brukere ha flere funksjoner tilgjengelig.",
        choosePrice: "Velg denne prisen 💡",
        priceChosen: "Valgt  🙌",
        included: "inkludert",
        responses: "svar",
        afterTier: "per svar etter det",
        vat: "Inkl. mva.",
        pay: "Betal nå",
        loading: "Oppgraderer.. Takk for tålmodigheten!",
        button: "Oppgrader Krets",
        salesArgument: "Derfor er Krets ekstra rimelig for alle som skaper noe på egenhånd!",
        includedAsSubscriber: "for mer funksjonalitet",
        thanks: {
            heading: "Tusen takk,",
            subscription: "Du har dette abonnementet: ",
            aboutFeedback: "Tilbakemeldinger er det eneste som muliggjør forbedring 👊",
            aboutKrets: "Krets er et lite og uavhengig selskap som ønsker å gjøre tilbakemelding så enkelt som mulig, for så mange som mulig.",
            contactPrefix: "Ta kontakt på",
            contactSuffix: "👋",
            greetings: "- daglig leder, utvikler, 👨‍💻 og alt annet"
        },
        back: "Tilbake til Krets",
        cancel: "Kanseller abonnement",
        sure: "Jeg er sikker",
        notSure: "Tilbake",
        cancellationError: "Noe galt skjedde 🤕 ",
        cancelContact: "Ta kontakt",
        cancelSuffix: ", dette skal ordnes opp i!"
    }
});

export const about = strings({
    en: {
        heading: "Hello, there 👋 ",
        first: `
            Feedback from as many people as possible is essential for someone wanting to improve 👊
            Most tools are just large, detailed forms 🥱 
        `,
        second: "Large forms = no feedback = no improvement 😔",
        third: "Krets is a new alternative.",
        fourth: "Krets is a small company working to make feedback frictionless.",
        greetings: " - founder, developer, 👨‍💻 and everything in between.",
        badAlternative: "Traditional 🗒️",
        goodAlternative: "Krets 🎉",

    },
    no: {
        heading: "Heisann 👋 ",
        first: `
            Tilbakemelding er essensielt for deg som vil bli bedre 👊
            De fleste verktøy er bare store, detaljerte skjemaer 🥱 
        `,
        second: "Store skjemaer = lite tilbakemelding = ingen forbedring 😔",
        third: "Krets er et nytt alternativ.",
        fourth: "Krets er et lite, uavhengig selskap som jobber for friksjonsfri tilbakemelding.",
        greetings: "- daglig leder, utvikler, 👨‍💻 og alt annet",
        badAlternative: "Tradisjonell 🗒️",
        goodAlternative: "Krets 🎉",
    }
})