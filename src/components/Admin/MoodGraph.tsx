import { VictoryLine, VictoryArea, VictoryAxis, VictoryChart, VictoryTheme } from "victory";
import { useContext } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { ReseponseModel, Emotion } from "../../models";
import { getegid } from "process";
import { Text, Flex, Box } from "rebass";

const emotionToNumeric = (emotion: Emotion) => ({
    ":-)": 2,
    ":-|": 1,
    ":-(": 0,
}[emotion])

const averageUntil = (response: ReseponseModel, responses: ReseponseModel[]) => {

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

    return ({
        y: sum / relevant.length,
        x: new Date(response.created_at).getTime() * -1
    })
}

const averageOverTime = (responses: ReseponseModel[]) => responses
    .map(response => averageUntil(response, responses));

export const MoodGraph = () => {

    const { responses, responsesLoading } = useContext(AdminPageContext);

    /* const EmojiPoint = (props) => {

        console.log("inside emojipoint with ", props);
        const y = props.y;
        const getEmoji = () => {
            if (y >= 1.8) return "😁";
            if (y >= 1.5) return "😊";
            if (y >= 0.8) return "😐";
            else return "😞";
        }

        return <text>
            {getEmoji()}
        </text>
    } */


    const coordinates = averageOverTime(responses);
    console.log(coordinates)
    return <Box>
        <VictoryChart
            theme={VictoryTheme.material}
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
            }}
        >
            <VictoryArea
                /* dataComponent={<EmojiPoint />} */
                data={coordinates} style={{ data: { fill: "orange", opacity: 0.7 } }} />
            <VictoryAxis />
            <VictoryAxis />
        </VictoryChart>
    </Box>
}