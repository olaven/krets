import { useContext, useEffect, useState } from "react";
import { AdminPageContext } from "../../../context/AdminPageContext";
import { CompareContext } from "../../../context/CompareContext";
import * as text from "../../../text";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { Collapsible } from "./Collapsible";


export const Charts = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id]);
    }, []);


    return <>
        <Collapsible text={text.charts.lineChartCollapsible}>
            <LineChart pageInformations={pageInformations} />
        </Collapsible>
        <Collapsible text={text.charts.barChartCollapsible}>
            <BarChart pageInformations={pageInformations} />
        </Collapsible>
    </>;
}