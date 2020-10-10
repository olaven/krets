import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Image, Link, Heading, Button } from "rebass";
import { Input } from "@rebass/forms";
import { GetStartedButton, TriggerLoadingButton } from "../../tiny/buttons";
import { intro } from "../../../text";
import { postEmail } from "../../../fetchers";
import { CREATED, OK } from "node-kall";
import { QRCode } from "react-qrcode-logo";
import { StichesButton, WithHoverColor } from "../../tiny/StichesButton";

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

const RequestAccess = () => {

    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        //regex source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        setValid(email === "" || valid);
    }, [email])

    const onRequestAccess = async () => {

        if (valid) {

            const [status] = await postEmail({
                from: email,
                text: `${email} etterspør tilgang til Krets!`
            });

            setSuccess(status === CREATED);
        }
    }

    return <Flex width={[1, 1 / 2, 1 / 3]} m="auto" p={[1, 2, 3]} flexDirection="column">
        {success ?
            <Text textAlign="center" backgroundColor="success" color="secondary" px={[1, 2]} py={[2, 3, 4]} fontSize={[3, 4, 5]}>{intro.requestAccess.success}</Text> :
            <>
                <Input
                    fontSize={[13, 21]}
                    color={valid ? 'black' : 'attention'}
                    onChange={({ target: { value } }) => {
                        setEmail(value)
                    }}
                    m={[1]}
                    placeholder={intro.requestAccess.placeholder}
                />
                <TriggerLoadingButton
                    text={intro.requestAccess.button}
                    action={onRequestAccess}
                />
            </>
        }
    </Flex >
}

export const IntroSection = () => {


    return <Box >

        <Flex py={1}>
            <Text width={[1, 1 / 2]} m={[2, 3]} fontSize={[3, 4, 5]} textAlign="center">{intro.about}</Text>
            <Text width={[1, 1 / 2]} m={[2, 3]} fontSize={[3, 4, 5]} textAlign="center">{intro.aim}</Text>
        </Flex>

        <RequestAccess />
        <DisclaimerBox />

        <Flex py={4}>
            <Box width={[0, 1 / 4]}> </Box>
            <Box width={[1, 2 / 4]}>

                <Box backgroundColor="primary" color="secondary" width={1} padding={[1, 2]}>
                    <Heading textAlign="center" py={[1, 2]} fontSize={[2, 3, 5]}>{intro.instructions}</Heading>
                    <Flex>
                        <Box width={[1 / 20, 1 / 6]}></Box>
                        <Box width={[9 / 10, 4 / 6]}>
                            <Image margin="auto auto" src="/krets-qr.png" />
                        </Box>
                        <Box width={[1 / 20, 1 / 6]}></Box>
                    </Flex>
                </Box>
            </Box>
            <Box width={[0, 1 / 4]}> </Box>
        </Flex>

        {/*  <Flex width={1} flexWrap="wrap">
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
        </Flex> */}
    </Box>
};