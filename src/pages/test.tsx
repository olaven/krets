import { AdminWrapper } from "../components/AdminWrapper";
import { pdf } from "../pdf";


export default AdminWrapper(() => {


    const onClick = () => {
        
        pdf()
            .withTextSize()
            .writeAt.bottom("bottom")
            .writeAt.top("top")
            .writeAt.middle("middle 😄")
            .save()
    }

    return <>
        <button onClick={onClick}>Last ned PDF</button>
    </>
})