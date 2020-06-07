import { useRouter } from "next/router";
import { QRCode } from "react-qrcode-logo";
import React from "react";
import { Box, Flex, Heading } from "rebass";
import { usePage } from "../../effects/usePage";

export default () => {

    const router = useRouter();
    const { pageId } = router.query;
    //TODO: use pagecontext to pull correct page 
    const pageLink = `https://krets.app/${pageId}`;
    const [page, _] = usePage(pageId as string);

    const headingText = page ?
        `Gi tilbakemelding til ${page.name}`:
        `(Laster..)`;


    return <Box m={"auto"} py={[4, 8, 16]}>
        <Flex m={"auto"}>
            <Box m={"auto"} style={{textAlign: "center"}}>
                <Heading m="auto" color={"primary"}>{headingText}</Heading>
                <QRCode value={pageLink} enableCORS={false} />
            </Box>
        </Flex>

    </Box>
}