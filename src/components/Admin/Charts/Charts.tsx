import { useContext, useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { AdminPageContext } from "../../../context/AdminPageContext";
import { CompareContext } from "../../../context/CompareContext";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";


export const Charts = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id]);
    }, []);


    const [visible, setVisible] = useState(true);
    return <>
        <div
            onClick={() => {
                setVisible(!visible)
            }}>
            <div

            >min trigger</div>
            <div
                style={{
                    display: visible ? "block" : "none"
                }}
            >
                Graf
            </div>

        </div>
        <Collapsible trigger="first" style={{ backgroundColor: "orange" }}>
            <LineChart pageInformations={pageInformations} />
        </Collapsible>
        <Collapsible trigger="andre">
            <BarChart pageInformations={pageInformations} />
        </Collapsible>
    </>;
}