import { Box, Button, Text } from "rebass"
import { emojidata } from "../../emojidata";

export const KretsEmoji = props => {

    const { type, emotion, setEmotion } = props;

    const style = (emotion === type) ?
        {
            fontSize: [55, 89, 144],
            //fontSize: [48, 64, 128],
        } : {
            fontSize: [34, 55, 89],
        };


    return <Box  {...style} m={[1, 2, 3]} onClick={() => { setEmotion(type) }}>
        <Button aria-label="response-emoji-button" backgroundColor="secondary"
            /* sx={{
                boxShadow: "large",
            }}*/ >
            <div style={{ borderBottom: (type === emotion && "solid #0A585C"), borderRadius: "5px" }}>
                <Text>{emojidata[type]}</Text>
            </div>


        </Button>
    </Box >

};