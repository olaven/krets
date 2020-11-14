import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Image, Link, Button, Heading } from "rebass";
import { Input } from "@rebass/forms";
import { TriggerLoadingButton } from "../../standard/buttons";
import { intro } from "../../../text";
import { validateEmail } from "../../../email";
import { postEmail } from "../../../fetchers";
import { CREATED, OK } from "node-kall";

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

    const [beforeTyping, setBeforeTyping] = useState(true);
    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        setValid(beforeTyping || validateEmail(email));
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

    return <Flex width={[1]} m="auto" flexDirection="column">
        <Text fontSize={[2, 3, 4]}>{intro.requestAccess.curious}</Text>
        {success ?
            <Text textAlign="center" backgroundColor="success" color="secondary" px={[1, 2]} py={[2, 3, 4]} fontSize={[3, 4, 5]}>{intro.requestAccess.success}</Text> :
            <Flex alignItems="center" flexDirection="column">
                <Input
                    fontSize={[13, 21]}
                    color={valid ? 'black' : 'attention'}
                    onChange={({ target: { value } }) => {

                        setBeforeTyping(false);
                        setEmail(value)
                    }}
                    m={[1]}
                    placeholder={intro.requestAccess.placeholder}
                />
                <TriggerLoadingButton
                    text={intro.requestAccess.button}
                    action={onRequestAccess}
                />
            </Flex >
        }
    </Flex >
}

export const IntroSection = () => {


    return <Box>

        <Flex py={[1, 2, 3]} justifyContent="space-around" >

            <Flex flexDirection="row" width={[1, 1 / 3]}>
                <Text width={[1]} m={[2, 3]} fontSize={[3, 4, 5]}>
                    {intro.about}
                    <br /><br />
                    {intro.aim}
                </Text>
            </Flex>

            <Flex flexDirection="column" width={[1, 1 / 3]}>
                <RequestAccess />
                <DisclaimerBox />
            </Flex>
        </Flex>

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
    </Box >
};