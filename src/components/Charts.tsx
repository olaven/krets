import { useContext, useEffect } from "react";
import { AdminPageContext } from "../context/AdminPageContext";
import { CompareContext } from "../context/CompareContext";
import { styled } from "../stiches.config";
import * as text from "../helpers/text";
import { LineChart, BarChart, DistributionChart, ChartSuggestion } from "./Admin/Charts/Charts";
import { Collapsible } from "./Collapsible"

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
});

export const Charts = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id]);
    }, []);

    return <Container>
        <Collapsible text={text.charts.lineChartCollapsible}>
            <LineChart pageInformations={pageInformations} />
        </Collapsible>
        <Collapsible text={text.charts.barChartCollapsible}>
            <BarChart pageInformations={pageInformations} />
        </Collapsible>
        <Collapsible text={text.charts.distribution.collapsible}>
            <DistributionChart />
        </Collapsible>
        <Collapsible text={text.charts.suggestion.collapsible}>
            <ChartSuggestion />
        </Collapsible>
    </Container>;
}