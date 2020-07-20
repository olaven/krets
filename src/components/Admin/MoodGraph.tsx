import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis } from "victory"
import { useContext, useEffect, useState } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { Emotion } from "../../models";
import { Box } from "rebass";
import { CompareContext, PageInformation } from "../../context/CompareContext";
import * as text from "../../text"

export const emotionToNumeric = (emotion: Emotion) => ({
    ":-)": 2,
    ":-|": 1,
    ":-(": 0,
}[emotion])

const pageInformationsToCoordinates = (pageInformations: PageInformation[]) => pageInformations
    .map(({ page, responses }) => ({
        x: page.name,
        y: responses.length === 0 ? [] : responses.map((response => emotionToNumeric(response.emotion))).reduce((a, b) => a + b) / responses.length
    }));

const Graph = ({ coordinates }) => <Box>
    <VictoryChart
        theme={VictoryTheme.material}
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

export const MoodGraph = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);
    const [coordinates, setCoordinates] = useState<{ x: string, y: number }[]>([])

    useEffect(() => {
        setSelected([page.id]);
    }, [])

    useEffect(() => {

        const coordinates = pageInformationsToCoordinates(pageInformations);
        setCoordinates(coordinates);
    }, [pageInformations.length])


    return coordinates && <Graph coordinates={coordinates} />
}