import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryPolarAxis, VictoryBar } from "victory";
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

const daysBetween = (date: Date) => {


    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date.getTime() - Date.now());
    return Math.round(differenceMs / ONE_DAY);
}

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
        x: ["dogs", "cats", "mice"], //daysBetween(new Date(response.created_at)),
    })

    /**
     * Hver page er en X-kategori
     */
}

const averageOverTime = (responses: ReseponseModel[]) => responses
    .map(response => averageUntil(response, responses));

export const MoodGraph = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id, "andreside", "tredjeside"]);
    }, [])

    /* const extractedCoordinates = pageInformations
        .map(({ responses }) => responses)
        .map(averageOverTime) */


    const coordinates = pageInformations
        .map(({ page, responses }) => ({
            x: page.name,
            y: responses.map((response => emotionToNumeric(response.emotion))).reduce((a, b) => a + b)
        }));



    return <Box>
        <VictoryChart
            name="Name of Chart"
            theme={VictoryTheme.material}
        >
            <VictoryBar
                data={coordinates}
            />);
        </VictoryChart>
    </Box>
}