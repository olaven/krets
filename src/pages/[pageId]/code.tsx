import {useRouter} from "next/router";
import {QRCode} from "react-qrcode-logo";
import React from "react";
import {Box, Flex, Heading} from "rebass";

export default () => {

    const router = useRouter();
    const {pageId} = router.query;
    //TODO: use pagecontext to pull correct page 
    const pageLink = `https://krets.app/${pageId}`;

    return <Box m={"auto"} py={[4, 8, 16]}>
        <Box>
            <Heading color={"primary"}>Gi tilbakemelding!</Heading>
        </Box>
        <Box>
            <QRCode value={pageLink} enableCORS={false}/>
        </Box>

    </Box>
}