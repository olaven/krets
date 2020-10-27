import LocalizedStrings from "react-localization";

const strings = (config: { en: any, no: any }) => {

    const strings = new LocalizedStrings(config);

    /*
        NOTE: forces norwegian, as that is the market Krets is going for ATM.
        Remove the line below to make language dynamic again.
    */
    strings.setLanguage("no");
    return strings;
}

export const intro = strings({
    en: {
        requestAccess: {
            button: "Request access",
            placeholder: "Your work-email",
            success: "Welcome✋ We'll get back to you as quickly as possible!"
        },
        about: "You'll only improve through feedback 👊",
        aim: "Krets aims to make it frictionless 😁",
        instructions: "See how it works - Scan with your phone 🤳✨",
        create: "Creating a page on Krets is fast!",
        visiting: "Your audience visits your site, with a link or a QR-code",
        insight: "Gain insight!",
        termsOfUse: "terms of use",
        privacyPolicy: "privacy policy",
        acceptPrefix: "Users accept Krets'",
        acceptInfix: "and",
        acceptSuffix: "📝"
    },
    no: {
        requestAccess: {
            button: "Etterspør tilgang",
            placeholder: "Din e-post",
            success: "Velkommen✋ Vi kommer tilbake til deg så fort vi kan!"
        },
        requestAccessButton: "Etterspør tilgang",
        requestAccessPlaceholder: "Din e-post",
        about: "Tilbakemeldinger er nødvendig for forbedring 👊",
        aim: "Krets ønsker å gjøre det friksjonsfritt 😁",
        instructions: "Se hvordan det funker - Scan med telefonen 🤳✨",
        create: "Å lage en Krets-side er kjapt!",
        visiting: "Ditt publikum besøker din side, med link eller QR-kode",
        insight: "Få innsikt!",
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
            sad: "What did you dislike?",
            standard: "Your answer..",
        },
        button: "->",
        chooseSmiley: "You have to choose a smiley 😃",
        error: "Oh no! Something wrong happened 😧",
        thanks: "Thank you!",
        prefixCustomQuestionCheckbox: "I want to answer", //temporary not used in favour of `customQuestionsCheckbox`
        suffixCustomQuestionCheckbox: "questions", //temporary not used in favour of `customQuestionsCheckbox`
        customQuestionsCheckbox: "Let me elaborate",

        contact: {
            heading: "I want to be contacted",
            yes: "yes please",
            no: "no thank you",
            placeholder: "Email or phone number",
        },
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
            sad: "Hva mislikte du?",
            standard: "Ditt svar"
        },
        button: "Send inn",
        chooseSmiley: "Velg en smiley 😃",
        error: "Auda, her skjedde det en feil 😧",
        thanks: "Tusen takk!",
        prefixCustomQuestionCheckbox: "Jeg vil svare på",
        suffixCustomQuestionCheckbox: "spørsmål",
        customQuestionsCheckbox: "La meg utdype svaret mitt",

        contact: {
            heading: "Jeg vil bli kontaktet igjen",
            yes: "ja takk",
            no: "nei takk",
            placeholder: "Epost eller telefonnummer"
        },


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
        guide: "Help",
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
        guide: "Help",
        aboutPage: "Om",
        getStarted: "Kom i gang!",
        toAdmin: "Oversikt",
        toQR: "QR-kode",
        toPage: "Landingsside",
        toSettings: "Innstillinger",
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
        average: "Average score:",
        count: "Response count:",
        contactDetails: "Contact details",
        loading: "Loading admin page...",
        notOwning: "You do not own this page."
    },
    no: {
        average: "Gjennomsnittlig score:",
        count: "Antall svar:",
        contactDetails: "Kontaktinformasjon",
        loading: "Laster adminside...",
        notOwning: "Denne siden eier du ikke."
    }
});

export const administratorPage = strings({
    en: {
        denied: "You do not have access to this page"
    },
    no: {
        denied: "You do not have access to this page"
    }
})

export const guide = strings({
    en: {
        toGetStartedVideo: "How do I get started?",
        toShareVideo: "How do I share with my audience?",
        toAdminVideo: "How do I see the feedback?",
    },
    no: {
        toGetStartedVideo: "Hvordan kommer jeg i gang?",
        toShareVideo: "Hvordan deler jeg med mitt publikum?",
        toAdminVideo: "Hvordan ser jeg tilbakemeldinger?",
    }
})

export const settings = strings({
    en: {
        heading: "Settings page for",
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
            heading: "Manage questions",
            createQuestion: "Create question",
            placeholder: "Enter question",
            createButton: "Create new",
            listHeader: "Your questions",
            updateButton: "Update",
            archiveButton: "Archive.",
            unstable: "Custom questions an unstable feature - it may change"
        },
        embeddable: {
            heading: "Use Krets on your website",
            info: "Add Krets-feedback to your own website 🖇️",
            button: "Generate code",
            originPlaceholder: "https://www.your-website.com",
            copyInstructions: "Add this code to your website 🧑‍💻"
        },
        mandatoryContact: {
            heading: "Require contact details",
            enabledText: "Your respondents must enter email",
            updateWhenEnabled: "Make optional",
            disabledText: "Your respondents may omit contact details",
            updateWhenDisabled: "Require contact details",
        }
    },
    no: {
        heading: "Innstillinger for",
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
            heading: "Egne spørsmål",
            createQuestion: "Lag spørsmål",
            placeholder: "Enter question",
            createButton: "Opprett",
            listHeader: "Dine spørsmål",
            updateButton: "Oppdater",
            archiveButton: "Arkiver.",
            unstable: "'Egne spørsmål' er en ustabil funksjon - den kan endre seg"
        },
        embeddable: {
            heading: "Bruk Krets på nettsiden din",
            info: "Få tilbakemelding rett fra din egen hjemmeside 🖇️",
            button: "Generer kode",
            originPlaceholder: "https://www.din-hjemmeside.no",
            copyInstructions: "Bruk denne koden til din nettside 🧑‍💻"
        },
        mandatoryContact: {
            heading: "Om kontaktinformasjon",
            enabledText: "Dine kunder må legge igjen kontakinformasjon",
            updateWhenEnabled: "Gjør det frivillig å legge inn kontaktinformasjon",
            disabledText: "Dine kunder kan nå være anonyme",
            updateWhenDisabled: "Gjør det obligatorisk med kontaktinformasjon",
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
        distribution: {
            collapsible: "Show distribution of smileys",
        },
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
        distribution: {
            collapsible: "Vis fordeling av smilefjes"
        },
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
        heading: "Setup subscription to Krets!",
        trailInformation: "All plans have a 14 day free trail",
        choosePrice: "Choose 💡",
        priceChosen: "Chosen 🙌",
        pay: "Start subscription",
        vat: "VAT included.",
        monthly: "Price in NOK - Charged monthly",
        included: "including",
        pages: "pages",
        afterTier: "per additional page",
        loading: "Updating.. Thanks for our patience!",
        button: "Setup subscription",
        salesArgument: "That's why Krets has a low price for everyone creating something by themselves!",
        includedAsSubscriber: "for access and updates",
        thanks: {
            heading: "Thank you,",
            subscription: "You have this subscription: ",
            aboutFeedback: "Feedback is the only way to improve👊",
            aboutKrets: "Krets is a small and independent company, working to make feedback as accessible as possible, for as many people as possible.",
            contactPrefix: "Reach out at",
            contactSuffix: "👋",
            greetings: "- founder, developer, 👨‍💻 and everything in between"
        },
        getHelp: "How do I use Krets?",
        back: "Back to Krets",
        cancel: "Cancel subscription",
        sure: "I am sure",
        notSure: "Back",
        cancellationError: "Something wrong happened 🤕 ",
        cancelContact: "Reach out",
        cancelSuffix: ", we'll get things right!"
    },
    no: {
        heading: "Finn abonnementet som passer deg!",
        trailInformation: "Det er alltid en gratis prøveperiode på 14 dager",
        choosePrice: "Velg denne prisen 💡",
        priceChosen: "Valgt  🙌",
        included: "inkludert",
        pages: "sider",
        afterTier: "per ekstra side",
        vat: "Pris i NOK - Inkl. mva.",
        monthly: "Pris per måned",
        pay: "Start abonnement",
        loading: "Oppgraderer.. Takk for tålmodigheten!",
        button: "Opprett abonnemment",
        salesArgument: "Derfor er Krets ekstra rimelig for alle som skaper noe på egenhånd!",
        includedAsSubscriber: "for tilgang og oppdateringer",
        thanks: {
            heading: "Tusen takk,",
            subscription: "Du har dette abonnementet: ",
            aboutFeedback: "Tilbakemeldinger er det eneste som muliggjør forbedring 👊",
            aboutKrets: "Krets er et lite og uavhengig selskap som ønsker å gjøre tilbakemelding så enkelt som mulig, for så mange som mulig.",
            contactPrefix: "Ta kontakt på",
            contactSuffix: "👋",
            greetings: "- daglig leder, utvikler, 👨‍💻 og alt annet"
        },
        getHelp: "Hvordan bruker jeg Krets?",
        back: "Tilbake til Krets",
        cancel: "Kanseller abonnement",
        sure: "Helt sikker",
        notSure: "Tilbake",
        cancellationError: "Noe galt skjedde 🤕 ",
        cancelContact: "Ta kontakt",
        cancelSuffix: ", dette skal ordnes opp i!"
    }
});

/**
 * This should slowly replace `upgrade`, as it does not make sense without Stripe 
 */
export const accountInfo = strings({
    en: {
        welcome: "Welcome, ",
        inactiveInfo: "Your account is not activated yet. If you believe this is a mistake, contact post@krets.app"
    },
    no: {
        welcome: "Velkommen, ",
        inactiveInfo: "Din konto er ikke aktiv. Er dette feil? Ta kontakt på post@krets.app"
    }
})

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