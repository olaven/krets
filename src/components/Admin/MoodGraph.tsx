import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryPolarAxis } from "victory";
import { useContext, useEffect } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { ReseponseModel, Emotion } from "../../models";
import { Box } from "rebass";
import { CompareContext } from "../../context/CompareContext";

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

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id]);
    }, [])

    const extractedCoordinates = pageInformations
        .map(({ responses }) => responses)
        .map(averageOverTime)

    const renderArea = () => extractedCoordinates.map(coordinate => <VictoryArea
        data={coordinate} style={{ data: { fill: "blue", opacity: 0.5 } }}
    />);

    return <Box>
        <VictoryChart
            theme={VictoryTheme.material}
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
            }}
        >
            {renderArea()}
        </VictoryChart>
    </Box>
}