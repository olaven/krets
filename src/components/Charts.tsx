import { useContext, useEffect } from "react";
import { AdminPageContext } from "../context/AdminPageContext";
import { CompareContext } from "../context/CompareContext";
import * as text from "../text";
import { LineChart } from "./Admin/Charts/LineChart";
import { BarChart } from "./Admin/Charts/BarChart";
import { DistributionChart } from "./Admin/Charts/DistributionChart"
import { Collapsible } from "./Collapsible"
import ChartSuggestion from "./Admin/Charts/ChartSuggestion";


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