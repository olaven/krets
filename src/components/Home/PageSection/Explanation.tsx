import { PagesContext } from "../../../context/PagesContext"
import { useContext, useState } from "react";
import { Box, Button } from "rebass";


const ExplanationContent = ({ onClick }) => <Box>
    Hjelpen staar her!
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