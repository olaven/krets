import React from "react";
import { Flex, Box, Text, Image, Link, Heading } from "rebass";
import { LoginButton, GetStartedButton } from "../../tiny/buttons";
import { intro } from "../../../text";
import { TextBox } from "../../tiny/TextBox";

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

    const DisclaimerBox = () => <Box
        width={1}>
        <section style={{
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
        }}>

            <Text fontSize={[0, 1, 2]} textAlign="center">
                {intro.acceptPrefix} <Link href={"/legal/terms-and-conditions.html"}>{intro.termsOfUse}</Link> {intro.acceptInfix} <Link href={"/legal/privacy-policy.html"}>{intro.privacyPolicy} {intro.acceptSuffix}</Link>
            </Text>
        </section>
    </Box>


    return <Box >

        <Flex py={1}>
            <Text width={[1, 1 / 2]} m={[2, 3]} fontSize={[3, 4, 5]} textAlign="center">{intro.about}</Text>
            <Text width={[1, 1 / 2]} m={[2, 3]} fontSize={[3, 4, 5]} textAlign="center">{intro.aim}</Text>
        </Flex>

        <GetStartedButton />
        <DisclaimerBox />

        <Flex py={4}>
            <Box width={[0, 1 / 4]}> </Box>
            <Box width={[1, 2 / 4]}>

                <Box backgroundColor="primary" color="secondary" width={1}>
                    <Heading textAlign="center" py={[1, 2]}>{intro.instructions}</Heading>
                    <Flex>
                        <Box width={[1 / 20, 1 / 6]}></Box>
                        <Box width={[9 / 10, 4 / 6]}>
                            <Image margin="auto auto" src="/krets-qr.png" />
                            <Link href="https://krets.app/krets">https://krets.app/krets</Link>
                        </Box>
                        <Box width={[1 / 20, 1 / 6]}></Box>
                    </Flex>
                </Box>
            </Box>
            <Box width={[0, 1 / 4]}> </Box>
        </Flex>

        <Flex width={1} flexWrap="wrap">
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
    </Box>
};