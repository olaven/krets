import Emoji from "react-emoji-render";
import { Box, Button } from "rebass"

export const KretsEmoji = props => {

    const { type, emotion, setEmotion } = props;

    const style = (emotion === type) ?
        {
            fontSize: [32, 48, 64],
        } : {
            fontSize: [24, 32, 48],
        };


    return <Box  {...style} m={[1, 2, 3]} onClick={() => { setEmotion(type) }}>
        <Button aria-label="response-emoji-button"
            sx={{
                boxShadow: "large",
            }} >
            <Emoji text={type} />
        </Button>
    </Box>

};