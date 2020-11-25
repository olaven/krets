import { useContext } from "react";
import * as uiText from "../../helpers/text"; 
import { UserContext } from "../../context/UserContext";
import { Button } from "../standard/Button";

export const DownloadQR = ({ page, getCanvasURL }) => {


    const filename = `${page.id}-qr.png`

    return <Button>
        <a
            href={getCanvasURL()}
            download={filename}
            style={{ color: "inherit" }}>
            {uiText.page.download}
        </a>
    </Button>
}