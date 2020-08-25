import React from "react";
import { Flex, Box, Text, Image, Link } from "rebass";
import { LoginButton, GetStartedButton } from "../../tiny/buttons";
import { intro } from "../../../text";

export const IntroSection = () => {

    const IntroBox = ({ children, width = null }) => <Box
        width={width ? width : [1, 1, 1 / 2]}
        height={[150, 300, 300]}
        p={4}>
        {children}
    </Box>

    const IntroImageBox = ({ source }) => <IntroBox>
        <Image src={source}></Image>
    </IntroBox>


    const IntroTextBox = ({ children, width = null }) => <IntroBox
        width={width}>
        <section style={{
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Text my={[1, 2, 3]} fontSize={[3, 4, 5]} textAlign="center">
                {children}
            </Text>
        </section>

    </IntroBox >

    //TODO: remove when warning is no longer appropriate (ready to take customers)
    const DisclaimerBox = () => <Box
        width={1}
        height={[150, 300, 300]}
        p={4}>
        <section style={{
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
        }}>

            <Text fontSize={[0, 1, 2]} textAlign="center">
                {intro.earlyVersionDisclaimer} {intro.acceptPrefix} <Link href={"/legal/terms-and-conditions.html"}>{intro.termsOfUse}</Link> {intro.acceptInfix} <Link href={"/legal/privacy-policy.html"}>{intro.privacyPolicy} {intro.acceptSuffix}</Link>
            </Text>
        </section>
    </Box>


    return <Flex width={1} flexWrap="wrap">
        <GetStartedButton />
        <DisclaimerBox />
        <IntroTextBox>
            {intro.create}
        </IntroTextBox>
        <IntroImageBox source="/creation.svg" />
        <IntroImageBox source="/feedback.svg" />
        <IntroTextBox>
            {intro.visiting}
        </IntroTextBox>
        <IntroTextBox>
            {intro.insight}
        </IntroTextBox>
        <IntroImageBox source="/insight.svg" />
    </Flex>
};