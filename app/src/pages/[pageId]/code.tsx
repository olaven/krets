import { useRouter } from "next/router";
import { QRCode } from "react-qrcode-logo";
import React from "react";
import { Box, Flex, Heading } from "rebass";
import { usePage } from "../../effects/usePage";
import * as text from "../../text"

export default () => {

    const router = useRouter();
    const { pageId } = router.query;
    //TODO: use pagecontext to pull correct page 
    const pageLink = `https://krets.app/${pageId}`;
    const [page, _] = usePage(pageId as string);

    const headingText = page ?
        `${text.page.header} ${page.name}` :
        text.page.loading;


    return <Box m={"auto"} py={[4, 8, 16]}>
        <Flex m={"auto"}>
            <Box
                m={"auto"}
                p={[1, 2, 3]}
                style={{ textAlign: "center" }}
                sx={{
                    bg: "primary",
                }}>
                <QRCode value={pageLink} enableCORS={false} size={350} fgColor={'teal'} />
                <Heading my={[0, 1, 2]} m="auto" color={"secondary"}>{headingText}</Heading>
            </Box>
        </Flex>
    </Box>
}