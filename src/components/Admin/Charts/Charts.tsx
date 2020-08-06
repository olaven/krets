import { useContext, useEffect, useState } from "react";
/* import Collapsible from "react-collapsible"; */
import { AdminPageContext } from "../../../context/AdminPageContext";
import { CompareContext } from "../../../context/CompareContext";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { Collapsible } from "./Collapsible";


export const Charts = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id]);
    }, []);


    const [visible, setVisible] = useState(true);
    return <>
        <Collapsible text="first">
            <LineChart pageInformations={pageInformations} />
        </Collapsible>
        <Collapsible text="andre">
            <BarChart pageInformations={pageInformations} />
        </Collapsible>
    </>;
}