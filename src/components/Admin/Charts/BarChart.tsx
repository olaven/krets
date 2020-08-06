import { VictoryChart, VictoryBar, VictoryAxis, Box } from "victory";
import { ResponseModel } from "../../../models";
import { PageInformation } from "../../../context/CompareContext";
import { emotionToNumeric } from "./ChartUtils";
import * as text from "../../../text";

const responsesToAverage = (responses: ResponseModel[]) =>
    responses.length === 0 ?
        [] :
        responses.map((response => emotionToNumeric(response.emotion))).reduce((a, b) => a + b) / responses.length

const toChartData = (pageInformations: PageInformation[]) => pageInformations
    .map(({ page, responses }) => ({
        x: page.name,
        y: responsesToAverage(responses)
    }));

export const BarChart = ({ pageInformations }) => <span aria-label="bar-chart-label">
    <VictoryChart
        animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
        }}
        domainPadding={{ x: 15 }}
    >
        <VictoryBar
            data={toChartData(pageInformations)}
            style={{ data: { fill: "orange", opacity: 0.7 } }} />
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
            }}
        />

    </VictoryChart>
</span>