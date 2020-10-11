import { emojidata } from "../../../emojidata";
import { Emotion } from "../../../models/models";
import { css, styled } from "../../../stiches.config";

type Props = { selectedEmotion: Emotion, setSelectedEmotion: (emotion: Emotion) => void }
export const Emojis = ({ selectedEmotion, setSelectedEmotion }: Props) => {

    return <EmojiContainer>
        {([":-)", ":-|", ":-("] as Emotion[]).map(emotion =>
            <Emoji
                aria-label="response-emoji-button"
                key={emotion}
                selected={selectedEmotion ? selectedEmotion === emotion ? 'yes' : 'no' : 'unknown'}
                onClick={() => setSelectedEmotion(emotion)}
            >{emojidata[emotion]}</Emoji>
        )}
    </EmojiContainer>
}

const EmojiContainer = styled('div', {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
});


const notSelectedFade = css.keyframes({
    '20%': {
        transform: "translateY(-20%)",
        opacity: '0',
    },
    '100%': {
        transform: "translateY(-80%)",
        opacity: '0',
        position: 'absolute', /*Taken out of flex flow */
    }
});

const Emoji = styled('div', {

    transitionDuration: "100ms",
    transitionTimingFunction: 'ease-in',

    ':hover': {
        transform: 'scale(120%)'
    },

    large: {
        fontSize: "8em",
        marginLeft: "40px",
        marginRight: "40px",
    },

    small: {
        fontSize: "3em",
        marginLeft: "10px",
        marginRight: "10px",
    },

    variants: {
        selected: {
            no: {

                animationName: `${notSelectedFade}`,
                animationDuration: "400ms",
                animationFillMode: "forwards",
            },
            yes: {

                transform: 'scale(130%)',
                borderBottomStyle: "solid",
                borderBottomColor: "$primary",
            },
            unknown: {}
        },
    }
});

