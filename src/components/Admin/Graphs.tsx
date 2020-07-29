import { VictoryArea, VictoryLabel, VictoryHistogram, VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLine } from "victory"
import { useContext, useEffect, useState } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { ResponseModel, Emotion, PageModel } from "../../models";
import { Box, Heading } from "rebass";
import { CompareContext, PageInformation } from "../../context/CompareContext";
import * as text from "../../text"
import { LineChart } from "./Charts/LineChart";
import { emotionToNumeric } from "./Charts/ChartUtils";
import { BarChart } from "./Charts/BarChart";


export const Graphs = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id]);
    }, []);


    return <>
        <LineChart pageInformations={pageInformations} />
        <BarChart pageInformations={pageInformations} />
    </>;
}