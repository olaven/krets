import { useContext, useEffect } from "react";
import { AdminPageContext } from "../context/AdminPageContext";
import { CompareContext } from "../context/CompareContext";
import * as text from "../text";
import { LineChart, BarChart, DistributionChart, ChartSuggestion } from "./Admin/Charts/Charts";
import { Collapsible } from "./Collapsible"



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
        <Collapsible text={text.charts.distribution.collapsible}>
            <DistributionChart pageInformations={pageInformations} />
        </Collapsible>
        <Collapsible text={text.charts.suggestion.collapsible}>
            <ChartSuggestion />
        </Collapsible>
    </>;
}