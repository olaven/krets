const API_BASE = "https://krets.app/"; //"http://localhost:3000/"
let useState;

/**
 * HOF for: 
 * returning result of query. 
 * Returns One element if ID (i.e. "#") is targeted. 
 * Returns JS if not. 
* */
const get = (selector) =>
    () => selector.startsWith("#") ?
        document.getElementById(selector.substring(1)) :
        Array.from(
            document.querySelectorAll(selector)
        );


/*GETERS FOR ELEMENTS*/
const getEmojis = get(".krets-flex-element");
const getOptionalInuptContainer = get("#krets-optional-input-container");
const getQuestionContainer = get("#krets-questions-list");
const getContactInput = get("#krets-contact-input");
const getContactHeader = get("#krets-contact-header");
const getSendButton = get("#krets-send-button");

const getThanksContainer = get("#krets-thanks-container")
const getMainContainer = get("#krets-main-container")
const getErrorMessage = get("#krets-error-message");

const initializeState = (initializeState) => {


    let state = initializeState || {}
    return (updates = {}) => {

        state = {
            ...state,
            ...updates,
        }
        return state;
    }
}

const loadEmbedInformation = async () => {

    const { PAGE_ID, TOKEN } = useState();
    const response = await fetch(`${API_BASE}api/pages/${PAGE_ID}/embeddables/information?token=${TOKEN}`);

    if (response.status !== 200) {
        console.error(`${response.status} when loading Krets. Perhaps the token is wrong?`);
        return;
    }

    const information = await response.json();

    if (information.mandatoryContactDetails) {
        getContactHeader().innerText = "Kontaktinformasjon"
    }

    useState({
        ...information
    });
}

const showOptionalInput = () => {

    renderQuestions();
    getOptionalInuptContainer().style.opacity = 1;
}

const showThanks = () => {

    getMainContainer().style.display = "none";
    getThanksContainer().style.opacity = 1;
    getThanksContainer().style.display = "block";
}

const showError = () => {

    getErrorMessage().style.display = "block";
}

const onSend = async () => {

    const { TOKEN, PAGE_ID, answers, emotion, contactDetails, mandatoryContactDetails } = useState();

    if (mandatoryContactDetails && !contactDetails) {

        getContactInput().style.borderColor = "red";
        return;
    }

    const embeddableResponse = {
        token: TOKEN,
        response: {
            page_id: PAGE_ID,
            emotion,
            contact_details: contactDetails,
        },
        answers: Array.from(answers.values())
    }


    const { status } = await fetch(`${API_BASE}api/pages/${PAGE_ID}/embeddables/responses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(embeddableResponse)
    });

    status === 201 ?
        showThanks() :
        showError();
}

const setupClickListeners = () => {

    const remove = (element) => element.classList.add("krets-flex-element-removed");
    const select = (element) => {

        element.classList.add("krets-selected-emoji");

        useState({
            emotion: {
                "😄": ":-)",
                "😐": ":-|",
                "😞": ":-(",
            }[element.innerText],
        });
    }

    getSendButton().onclick = onSend;
    getEmojis()
        .forEach(emoji => {
            emoji.onclick = (event) => {

                select(event.target);
                showOptionalInput();

                getEmojis()
                    .filter(element => element.innerText !== event.target.innerText)
                    .map(remove);
            }
        });
}


const renderQuestions = () => {

    const renderQuestion = (question) => {

        const input = document.createElement("input");
        input.placeholder = question.text;
        input.classList.add("krets-question-input", "krets-input");
        input.onkeyup = event => {

            useState().answers.set(question.id, {
                text: event.target.value,
                question_id: question.id
            });
        }
        getQuestionContainer().appendChild(input);
    }

    const { questions, emotion } = useState()

    if (questions.length > 0) {

        questions.forEach(question => { renderQuestion(question) })
    } else {

        renderQuestion({
            text: ({
                ":-)": "Hva likte du?",
                ":-|": "Hva burde vært annerledes",
                ":-(": "Hva mislikte du",
            }[emotion])
        });
    }
}

const setupContactListener = () => {

    getContactInput().onkeyup = event => {

        useState({
            contactDetails: event.target.value
        });
    }
}

const generateLayout = () => {
    const container = get("#krets-embeddable")()
    container.innerHTML = `
    <div id="krets-thanks-container" class="krets-container">
        Tusen takk 🎉
    </div>
    <div id="krets-main-container" class="krets-container">
        <ul id="krets-emoji-list">
            <ul class="flex-container">
                <li class="krets-flex-element" role="button">
                    <div class="emoji">😄</div>
                </li>
                <li class="krets-flex-element" role="button">
                    <div class="emoji">😐</div>
                </li>
                <li class="krets-flex-element" role="button">
                    <div class="emoji">😞</div>
                </li>
            </ul>
        </ul>

        <div id="krets-optional-input-container">
            <h2 class="krets-sub-header">Valgfri utdypning</h2>
            <ul id="krets-questions-list"></ul>

            <h2 id="krets-contact-header" class="krets-sub-header">Valgfri kontaktinformasjon</h2>
            <input id="krets-contact-input" class="krets-input" type="email" placeholder="e-post eller telefonnummer" />
            <button id="krets-send-button">send</button>
            <p id="krets-error-message">auda, det skjedde en feil med tilbakemeldingen..</p>
        </div>
    </div>
    `
}

/**
 * This should not be called in code, but exposed to end user. 
 * */
const IntializeKrets = async (PAGE_ID, TOKEN) => {

    generateLayout();

    useState = initializeState({
        PAGE_ID,
        TOKEN,
        questions: [],
        answers: new Map(),
        mandatoryContactDetails: false
    });

    setupClickListeners();
    setupContactListener();
    await loadEmbedInformation();
}
