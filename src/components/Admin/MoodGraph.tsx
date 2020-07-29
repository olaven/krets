import { VictoryArea, VictoryLabel, VictoryHistogram, VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLine } from "victory"
import { useContext, useEffect, useState } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { ResponseModel, Emotion, PageModel } from "../../models";
import { Box, Heading } from "rebass";
import { CompareContext, PageInformation } from "../../context/CompareContext";
import * as text from "../../text"
import { date } from "faker";

export const emotionToNumeric = (emotion: Emotion) => ({
    ":-)": 2,
    ":-|": 1,
    ":-(": 0,
}[emotion])

const responsesToCoordinates = (responses: ResponseModel[]) =>
    responses.length === 0 ?
        [] :
        responses.map((response => emotionToNumeric(response.emotion))).reduce((a, b) => a + b) / responses.length



const pageInformationsToCoordinates = (pageInformations: PageInformation[]) => pageInformations
    .map(({ page, responses }) => ({
        x: page.name,
        y: responsesToCoordinates(responses)
    }));

const BarChart = ({ coordinates }) => <Box>
    <VictoryChart
        /* theme={VictoryTheme.material} */
        animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
        }}
        domainPadding={{ x: 15 }}
    >
        <VictoryBar
            data={coordinates}
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
</Box>

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

const getLineCoordinates = (responses: ResponseModel[]) => responses
    .map(response => toDateCoordinates(response, responses))



const LineChartByDate = ({ pageInformations }) => <VictoryChart
    minDomain={{ y: 0 }}
>
    {pageInformations.map(({ page, responses }) => <VictoryLine
        interpolation="natural"
        data={responses
            .map(response => toDateCoordinates(response, responses))}
        labels={({ datum }) => datum.y > 2 ? ":-)" : ":-|"}
        animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
        }}
    ></VictoryLine>
    )}
</VictoryChart >



export const MoodGraph = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);
    const [coordinates, setCoordinates] = useState<any[]>([]) //TODO: Type once format is more permanent

    useEffect(() => {
        setSelected([page.id]);
    }, [])

    useEffect(() => {

        const coordinates = pageInformationsToCoordinates(pageInformations);
        setCoordinates(coordinates);
    }, [pageInformations.length])


    return coordinates && <>
        <LineChartByDate pageInformations={pageInformations} />
        <BarChart coordinates={coordinates} />
    </>;
}