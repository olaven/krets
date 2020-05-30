import Emoji from "react-emoji-render";
import {Box, Button, Flex, Text} from "rebass"
import {Input} from '@rebass/forms'
import React from "react";

export const KretsEmoji = props => {

    const {type} = props;

    return <Box px={4}>
        <Text
            fontSize={[24, 32, 48]}>
            <Emoji text={type}/>
        </Text>
    </Box>

};

const HappyEmoji = () =>
    <KretsEmoji type={":D"}/>;
const NeutralEmoji = () =>
    <KretsEmoji type={":|"}/>;
const SadEmoji = () =>
    <KretsEmoji type={":("}/>;

export const FeedbackSection = props => {

    console.log("Page funnet", props.page);
    return <Flex m={"auto"} py={[4, 8, 16]}>


        <Flex mx={-2} mb={3}>
            <HappyEmoji/>
            <NeutralEmoji/>
            <SadEmoji/>
        </Flex>
        <Flex>
            <Input
                id='email'
                name='email'
                type='email'
                placeholder='valgfri tekst'
            />
            <Button>Send</Button>
        </Flex>


    </Flex>;
};