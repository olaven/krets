import { Emotion } from "../../../models/models";

export const emotionToNumeric = (emotion: Emotion) => ({
    ":-)": 2,
    ":-|": 1,
    ":-(": 0,
}[emotion]);

