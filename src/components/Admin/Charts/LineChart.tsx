import { ResponseModel } from "../../../models";
import { VictoryChart, VictoryLabel, VictoryLine } from "victory";
import { emotionToNumeric } from "./ChartUtils";

const getRelevant = (response: ResponseModel, responses: ResponseModel[]) =>
    responses.filter(r => new Date(r.created_at).getDate() <= new Date(response.created_at).getDate());

//TODO: this should be done in an SQL query backend 
const sumEmotions = (responses: ResponseModel[]) => responses
    .map(({ emotion }) => emotionToNumeric(emotion))
    .reduce((a, b) => a + b)

const toDateCoordinates = (response: ResponseModel, responses: ResponseModel[]) => {

    const relevant = getRelevant(response, responses);
    const sum = sumEmotions(relevant);
    const average = sum / relevant.length;

    return {
        y: average,
        x: new Date(response.created_at)
    }
}


export const LineChart = ({ pageInformations }) => <VictoryChart
    minDomain={{ y: 0 }}
>
    {pageInformations.map(({ page, responses }) => <VictoryLine
        interpolation="natural"
        data={responses
            .map(response => toDateCoordinates(response, responses))}
        //labels={({ datum }) => datum.y > 2 ? ":-)" : ":-|"}
        animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
        }}
        style={{
            data: {
                stroke: "cyan", //TODO: random based on page color 
                strokeWidth: 4
            }
        }}
    >
    </VictoryLine>
    )}
</VictoryChart >