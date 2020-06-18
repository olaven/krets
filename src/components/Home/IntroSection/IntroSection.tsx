import React from "react";
import { Flex, Box, Text, Image } from "rebass";
import { LoginButton, GetStartedButton } from "../../tiny/buttons";

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
            <Text fontSize={[3, 4, 5]} textAlign="center">
                {children}
            </Text>
        </section>

    </IntroBox >

    return <Flex width={1} flexWrap="wrap">
        <GetStartedButton />
        <IntroTextBox>
            Du oppretter kjapt en side på Krets.
        </IntroTextBox>
        <IntroImageBox source="/creation.png" />
        <IntroImageBox source="/feedback.png" />
        <IntroTextBox>
            Ditt publikum/kunder/tilhørere/seere besøker din side, med link eller QR-kode
        </IntroTextBox>
        <IntroTextBox>
            Du får innsikt!
        </IntroTextBox>
        <IntroImageBox source="/insight.png" />
    </Flex>
};