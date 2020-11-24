import { QRCode } from "react-qrcode-logo";
import * as text from "../../helpers/text"; 
import { H1 } from "../standard/Heading";

export const QRImage = ({ page }) => {

    const pageLink = `https://krets.app/${page?.id}`;

    const headingText = page ?
        `${text.page.header} ${page.name}` :
        text.page.loading;

    return <>
        <H1>{headingText}</H1>  
        <div className={"qr-code"}>
            <QRCode value={pageLink} enableCORS={false} size={400} fgColor={'#0A585C'} bgColor="#EBF3FE" />
        </div>
    </>
}