import { AdminWrapper } from "../components/AdminWrapper";
import { asyncEffect } from "../effects/asyncEffect";
import { pdf } from "../pdf/pdf";


export default AdminWrapper(() => {
    
    const onClick = async () => {

        const testQR = "data:image/png;base64,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"
        

        
    }

    return <>
        <button onClick={onClick}>Last ned PDF</button> 
    </>
})