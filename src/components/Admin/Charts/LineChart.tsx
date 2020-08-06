import { ResponseModel, PageModel } from "../../../models";
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from "victory";
import { emotionToNumeric } from "./ChartUtils";
import { PageInformation } from "../../../context/CompareContext";
import { response } from "../../../text";

const getRelevant = (response: ResponseModel, responses: ResponseModel[]) =>
    responses.filter(r => new Date(r.created_at).getTime() <= new Date(response.created_at).getTime());

//TODO: this should be done in an SQL query backend 
const sumEmotions = (responses: ResponseModel[]) => responses
    .map(({ emotion }) => emotionToNumeric(emotion))
    .reduce((a, b) => a + b)

const isLast = (element: any, array: any[]) =>
    array.indexOf(element) === (array.length - 1)

const toDateCoordinates = (page: PageModel, response: ResponseModel, responses: ResponseModel[]) => {

    const relevant = getRelevant(response, responses);
    const sum = sumEmotions(relevant);
    const average = sum / relevant.length;

    return {
        y: average,
        x: new Date(response.created_at),
        label: isLast(response, responses) ?
            page.name : null
    }
}

export const LineChart = ({ pageInformations }: { pageInformations: PageInformation[] }) => <span
    aria-label="line-chart-label">
    <VictoryChart
        domainPadding={{ y: 10 }}
        domain={{ y: [0, 2] }}
    >
        <VictoryAxis
            dependentAxis
            tickValues={[0, 1, 2]}
            tickFormat={tick => [":-(", ":-|", ":-)"][tick]} //TODO: Proper emoji
        />
        {pageInformations.map(({ page, responses }) => {

            const chartData = responses
                .map(response => toDateCoordinates(page, response, responses))

            return (
                <VictoryLine
                    key={page.id}
                    name={`line_${page.id}`}
                    style={{
                        data: { stroke: page.color ? page.color : "cyan", strokeWidth: 5 } //TODO: page.color
                    }}
                    data={chartData}
                    labelComponent={<VictoryLabel dx={10} dy={15} renderInPortal />}
                />
            );
        })}
    </VictoryChart>
</span>

