import Emoji from "react-emoji-render";
import {Text} from "rebass"
import React from "react";

export const KretsEmoji = props => {

    const {type} = props;

    return <Text
        fontSize={[5, 8, 5]}
    >
        <Emoji text={type}/>
    </Text>
};

const HappyEmoji = () =>
    <KretsEmoji type={":D"}/>;
const NeutralEmoji = () =>
    <KretsEmoji type={":|"}/>;
const SadEmoji = () =>
    <KretsEmoji type={":("}/>;

export const FeedbackSection = props => {

    console.log("Page funnet", props.page);
    return <div>

        <HappyEmoji/>
        <NeutralEmoji/>
        <SadEmoji/>
    </div>
};