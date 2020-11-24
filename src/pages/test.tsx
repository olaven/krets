import { AdminWrapper } from "../components/AdminWrapper";
import { asyncEffect } from "../effects/asyncEffect";
import { pdf } from "../pdf/pdf";


export default AdminWrapper(() => {
    
    asyncEffect(async () => {

        pdf()
            .font()
            .writeHeader("Hvordan har du det?")
            .writeSubheader("Din tilbakemelding betyr mye. 😄")
            .writeParagraph("Scan koden med ditt mobilkamera og gi meg din viktige tilbakemelding") 
            .setQR("someurl")
            .writeKretsPromo()
            .writeEmoji()
            .output("dataurlnewwindow")
    }, [])

    return <>
        pdf test
        {/* <button onClick={onClick}>Last ned PDF</button> */}
    </>
})