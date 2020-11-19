import { Emotion } from "../models/models";

export const emojidata = {
    ":-)": "😄",
    ":-|": "😐",
    ":-(": "😞",
    "tada": "🎉"
};

export const numericEmojiToString = (numeric: string): Emotion => ({
    "0": ":-(",
    "1": ":-|",
    "2": ":-)"
}[numeric.toString()])