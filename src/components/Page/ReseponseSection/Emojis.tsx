import { emojidata } from "../../../helpers/emojidata";
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
    alignSelf: "center",
});


const Emoji = styled('div', {

    flex: "1 0 auto",
    transitionDuration: "100ms",
    transitionTimingFunction: 'ease-in',

    ':hover': {
        transform: 'scale(120%)'
    },

    large: {
        fontSize: "$223",
        marginLeft: "40px",
        marginRight: "40px",
    },

    small: {
        fontSize: "$79",
        marginLeft: "10px",
        marginRight: "10px",
    },

    variants: {
        selected: {
            no: {

                flex: "0 0 auto",
                animationDuration: ".2s",
                animationTimingFunction: "linear",
                animationFillMode: "forwards",
                animationName: `${css.keyframes({
                    '100%': {
                        width: 0,
                        border: "none",
                        opacity: 0,
                        margin: 0,
                    }
                })}`,
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

