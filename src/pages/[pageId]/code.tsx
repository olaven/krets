import { useRouter } from "next/router";
import { QRCode } from "react-qrcode-logo";
import React, { useContext } from "react";
import { Box, Flex, Heading } from "rebass";
import { usePage } from "../../effects/usePage";
import * as text from "../../text"
import { Download } from "../../components/Code/download";
import { UserContext } from "../../context/UserContext";

export default () => {

    const { authUser } = useContext(UserContext);

    const pageId = useRouter().query.pageId as string;
    const [page, _] = usePage(pageId as string);

    const pageLink = `https://krets.app/${pageId}`;
    const userOwnsThePage = authUser && authUser.sub === page.owner_id;

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
                <div className={"qr-code"}>
                    <QRCode value={pageLink} enableCORS={false} size={350} fgColor={'teal'} />
                </div>
                <Heading my={[0, 1, 2]} m="auto" color={"secondary"}>{headingText}</Heading>
            </Box>
        </Flex>
        <Flex>
            <Box
                m="auto"
                p={[1, 2, 3]}
            >
                {userOwnsThePage && <Download
                    fileName={`${page?.name}-QR.png`}
                    querySelector=".qr-code > canvas" />}
            </Box>
        </Flex>
    </Box>
}