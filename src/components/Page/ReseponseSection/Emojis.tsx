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
    alignItems: 'center',// see without 
    flexDirection: "row", // see without -> should be default 
});


const Emoji = styled('div', {

    flex: "1 0 auto",
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

                flex: "0 0 auto",
                animationName: `${css.keyframes({
                    '100%': {
                        width: 0,
                        border: "none",
                        opacity: 0,
                        margin: 0,
                    }
                })}`,
                animationDuration: "280ms",
                animationFillMode: "forwards",
            },
            yes: {

                transitionDelay: "300ms",
                transform: 'scale(130%)',
                borderBottomStyle: "solid",
                borderBottomColor: "$primary",
            },
            unknown: {}
        },
    }
});
