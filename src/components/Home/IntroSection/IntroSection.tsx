import React, { useEffect, useState } from "react";
import { Box, Text, Link} from "rebass";
import { TriggerLoadingButton } from "../../standard/buttons";
import { intro } from "../../../helpers/text";
import { validateEmail } from "../../../helpers/email";
import { postEmail } from "../../../helpers/fetchers";
import { CREATED, OK } from "node-kall";
import { Testemonials } from "./Testemonials";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { H1 } from "../../standard/Heading";
import { TextInput } from "../../standard/Input";
import { Paragraph } from "../../standard/Text";
import { styled } from "../../../stiches.config";

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

    return <>
        <Text fontSize={[2, 3, 4]}>{intro.requestAccess.curious}</Text>
        {success ?
            <H1>{intro.requestAccess.success}</H1> :
            <div>
                <TextInput
                    placeholder={intro.requestAccess.placeholder}
                    color={valid ? 'black' : 'attention'}
                    onChange={({ target: { value } }) => {

                        setBeforeTyping(false);
                        setEmail(value)
                    }}
                />
                <TriggerLoadingButton
                    text={intro.requestAccess.button}
                    action={onRequestAccess}
                />
            </div >
        }
    </ >
}

const Container = styled(ColumnContainer, {
    justifyContent: "space-between", 
    height: "70vh"
})

export const IntroSection = () => {

    return <Container>
        <RowContainer style={{justifyContent: "space-evenly"}}>
            <ColumnContainer>
                <Paragraph>
                    {intro.about}
                </Paragraph>
                <Paragraph>
                    {intro.aim}
                </Paragraph>
            </ColumnContainer>
            <ColumnContainer>
                <RequestAccess />
                <DisclaimerBox />
            </ColumnContainer>
        </RowContainer>
        <Testemonials
            testemonials={
                [
                {
                    companyName: "Festningen Tannklinikk AS", 
                    quote:"Krets har gitt oss en spennende, ny måte å hente inn tilbakemeldigner fra våre pasienter",
                    personName:"Lars Martin Døving, daglig leder",
                    logoURL:"https://www.festningen-tannklinikk.no/media/logo_postive.svg",
                }, 
                {
                    companyName: "Gamle Banken Frisør", 
                    quote:"Med Krets kan vi få vite det kunden tenker, men ikke sier direkte til oss",
                    personName:"Astrid Camilla Dalberg, daglig leder",
                    logoURL:"/testemonials/gamle-banken.png",
                }, 
            ]
        }
        />
    </Container>
    }
