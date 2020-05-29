import {useRouter} from "next/router";
import {QRCode} from "react-qrcode-logo";
import React from "react";

export default () => {

    const router = useRouter(); //TODO: should be id, not name
    const { brandName } = router.query;

    // miniMAX Linux logo by Gabriel dos Santos / CC-BY-SA-3.0-BR
    const logo = "https://upload.wikimedia.org/wikipedia/commons/f/fc/MiniMAX_Linux_logo.svg";
    const value = `https://krets.app/${brandName}`



    return <div>
        Feedback page for {brandName}
        <QRCode
            value={value}
            //logoImage={logo}
            logoWidth={100}
            logoHeight={100}
            //bgColor={"#AAFF00"}
            ecLevel={"H"}
            logoOpacity={0.75}
        />
    </div>
}