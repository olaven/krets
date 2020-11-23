import { AdminWrapper } from "../components/AdminWrapper";
import { jsPDF} from "jspdf";


export default AdminWrapper(() => {


    const onClick = () => {
        
        const pdf = new jsPDF(); 
        pdf.setFontSize(55);
        pdf.text("10, 10", 10, 10); 
        pdf.setFontSize(15);
        pdf.text("20, 20", 20, 20); 
        pdf.save("test.pdf");
    }

    return <>
        <button onClick={onClick}>Last ned PDF</button>
    </>
})