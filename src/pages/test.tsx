import { AdminWrapper } from "../components/AdminWrapper";
import { pdf } from "../pdf";


export default AdminWrapper(() => {


    const onClick = () => {
        
        pdf()
            .writeHeader("heading")
            .writeSubheader("subheader")
            .writeParagraph("paragraph content hello")
            .setQR()
            .save()
    }

    return <>
        <button onClick={onClick}>Last ned PDF</button>
    </>
})