import { useRouter } from "next/router";
import { QRCode } from "react-qrcode-logo";
import React, { useContext } from "react";
import { Box, Flex, Heading } from "rebass";
import { usePage } from "../../effects/usePage";
import * as text from "../../text"
import { Download } from "../../components/Code/download";
import { UserContext } from "../../context/UserContext";

export const DownloadQR = ({ page }) => {

    const { authUser } = useContext(UserContext);
    const userOwnsThePage = authUser && authUser.sub === page.owner_id;

    return <Flex>
        <Box
            m="auto"
            p={[1, 2, 3]}
        >
            {userOwnsThePage && <Download
                fileName={`${page?.name}-QR.png`}
                querySelector=".qr-code > canvas" />}
        </Box>
    </Flex>
}

const QRImage = ({ page }) => {

    const pageLink = `https://krets.app/${page?.id}`;

    const headingText = page ?
        `${text.page.header} ${page.name}` :
        text.page.loading;

    return <Box>
        <Heading
            my={[0, 1, 2]}
            textAlign="center"
            m="auto"
            color="primary"
        >{headingText}</Heading>
        <Box
            p={[1, 2]}
            style={{ textAlign: "center" }}
        >
            <div className={"qr-code"}>
                <QRCode value={pageLink} enableCORS={false} size={350} fgColor={'teal'} />
            </div>
        </Box>
    </Box >
}

export default () => {

    const pageId = useRouter().query.pageId as string;
    const [page, _] = usePage(pageId as string);

    return <Box m={"auto"} py={[4, 8, 16]}>
        <QRImage page={page} />
        <DownloadQR page={page} />
    </Box>
}