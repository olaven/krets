import { OK } from "node-kall"
import { VictoryChart, VictoryBar, VictoryAxis, Box } from "victory";
import { ResponseModel } from "../../../models";
import { PageInformation } from "../../../context/CompareContext";
import { emotionToNumeric } from "./ChartUtils";
import * as text from "../../../text";
import { getOverallAverage } from "../../../fetchers";
import { useState } from "react";
import { asyncEffect } from "../../../effects/asyncEffect";

const responsesToAverage = (responses: ResponseModel[]) =>
    responses.length === 0 ?
        [] :
        responses.map((response => emotionToNumeric(response.emotion))).reduce((a, b) => a + b) / responses.length

const toChartData = (pageInformations: PageInformation[]) => pageInformations
    .map(({ page, responses }) => ({
        x: page.name,
        y: responsesToAverage(responses)
    }));

const Axis = () => <>
    <VictoryAxis
        label={text.moodGraph.xLabel}
        style={{
            axisLabel: { padding: 30 }
        }}
    />
    <VictoryAxis dependentAxis
        label={text.moodGraph.yLabel}
        style={{
            axisLabel: { padding: 40 }
        }} />
</>

const Bar = ({ page }) => {

    const [average, setAverage] = useState(0);

    asyncEffect(async () => {

        const [status, average] = await getOverallAverage(page.id);
        if (status === OK) {

            setAverage(average);
        }
    }, []);

    console.log(average);

    //NOTE: Related issue: https://github.com/FormidableLabs/victory/issues/1667
    return <VictoryBar
        data={[{ x: page.name, y: average }]}
        style={{ data: { fill: page.color || "orange", opacity: 0.7 } }} />
}

export const BarChart = ({ pageInformations }) => <span aria-label="bar-chart-label">
    <VictoryChart
        animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
        }}
        domainPadding={{ x: 15 }}
    >
        {pageInformations.map(({ page }) =>
            <Bar page={page} />
        )}
        <Axis />
    </VictoryChart>
</span>