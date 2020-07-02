import { PagesContext } from "../../../context/PagesContext"
import { useContext, useState } from "react";
import { Box, Button, Text, Heading } from "rebass";
import * as text from "../../../text"


const ExplanationContent = ({ onClick }) => <Box>
    <Text>
        <Heading>Lag en side!</Heading>
        <Text>
            Lag en Krets-side som representerer det du vil ha tilbakemelding paa!
            
        </Text>
        <Text>
            Bruk tekstfeltet under til aa skrive inn et passende navn
        </Text>
        <ul>
            <li>Lag en Krets-side som representerer det du vil ha tilbakemelding paa</li>
            <li>Finn siden i listen nedenfor</li>
        </ul>
        <ul>
            <li>"{text.buttons.toPage}" er siden du deler med ditt publikum!</li>
            <li>"{text.buttons.toQR}" gir det en QR-kode som er lett aa dele!</li>
            <li>"{text.buttons.toAdmin}" viser det tilbakemeldingene du har mottatt</li>
        </ul>
    </Text>
    <Button onClick={onClick} id="help-understood-button">
        Skjønner!
    </Button>
</Box>

const ExplanationButton = ({ onClick }) =>
    <Button onClick={onClick} id="get-help-button">
        Vis meg hvordan Krets funker!
</Button>

export const Explanation = () => {

    const { pages } = useContext(PagesContext);
    if (pages.length !== 0) return null;

    const [wantsHelp, setWantsHelp] = useState(false);

    return <Box aria-label="explanation-section">
        {wantsHelp ?
            <ExplanationContent onClick={() => { setWantsHelp(false) }} /> :
            <ExplanationButton onClick={() => { setWantsHelp(true) }} />}
    </Box>
}