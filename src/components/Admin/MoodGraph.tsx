import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryPolarAxis } from "victory";
import { useContext } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { ReseponseModel, Emotion } from "../../models";
import { Box } from "rebass";

export const emotionToNumeric = (emotion: Emotion) => ({
    ":-)": 2,
    ":-|": 1,
    ":-(": 0,
}[emotion])

export const averageUntil = (response: ReseponseModel, responses: ReseponseModel[]) => {

    const date = new Date(response.created_at);
    const relevant = responses
        .sort((a, b) => new Date(a.created_at) < new Date(b.created_at) ? -1 : 1)
        .filter(({ created_at }) => new Date(created_at).getTime() <= date.getTime())

    const sum = relevant.length === 0 ?
        0 : relevant.length === 1 ?
            emotionToNumeric(relevant[0].emotion) :
            relevant
                .map(({ emotion }) => emotionToNumeric(emotion))
                .reduce((a, b) => a + b)

    const average = sum / relevant.length;
    return ({
        y: average,
        x: new Date(response.created_at),
    })
}

const averageOverTime = (responses: ReseponseModel[]) => responses
    .map(response => averageUntil(response, responses));

export const MoodGraph = () => {

    const { responses, responsesLoading } = useContext(AdminPageContext);
    const coordinates = averageOverTime(responses);

    return <Box>
        <VictoryChart
            theme={VictoryTheme.material}
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
            }}
        >
            <VictoryArea
                data={coordinates} style={{ data: { fill: "orange", opacity: 0.7 } }} />
        </VictoryChart>
    </Box>
}