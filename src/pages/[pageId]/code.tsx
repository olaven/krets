import {useRouter} from "next/router";
import {QRCode} from "react-qrcode-logo";
import React from "react";
import {Box, Flex, Heading} from "rebass";

export default () => {

    const router = useRouter(); //TODO: should be id, not name
    const { pageId } = router.query;


    const value = `https://krets.app/${pageId}`;
    console.log("value", value);


    return <Flex m={"auto"}>
        <Box width={1}>
            <Heading color={"primary"}>Gi tilbakemelding!</Heading>
        </Box>
        <Box width={1}>
            <QRCode value="https://krets.app/guros-kafe" enableCORS={false} />
        </Box>
    </Flex>
}