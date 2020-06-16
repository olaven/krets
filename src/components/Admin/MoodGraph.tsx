import { VictoryLine, VictoryArea, VictoryAxis, VictoryChart, VictoryTheme } from "victory";
import { useContext } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { ReseponseModel, Emotion } from "../../models";
import { date } from "faker";

export const daysSince = (date) => {

    console.log("date: ", date);
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date - Date.now());
    return Math.round(differenceMs / ONE_DAY);
}

const emotionToNumeric = (emotion: Emotion) => ({
    ":-)": 2,
    ":-|": 1,
    ":-(": 0,
}[emotion])

const toChartCoordinates = (responses: ReseponseModel[]) =>
    responses.map(({ emotion, created_at }) => ({
        x: daysSince(new Date(created_at)),
        y: emotionToNumeric(emotion),
    }))

export const MoodGraph = () => {

    //const { responses, responsesLoading } = useContext(AdminPageContext);

    console.log("before")
    const today = new Date()
    const responses = toChartCoordinates([
        {
            emotion: ":-)",
            text: "This was good",
            page_id: "1",
            created_at: today.toString()
        },
        {
            emotion: ":-)",
            text: "This was good",
            page_id: "2",
            created_at: today.toString()
        },
        {
            emotion: ":-|",
            text: "This was ok",
            page_id: "3",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 3))).toString()
        },
        {
            emotion: ":-(",
            text: "Not what I expected",
            page_id: "4",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 4))).toString()
        },
        {
            emotion: ":-)",
            text: "Not what I expected",
            page_id: "5",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 2))).toString()
        },
        {
            emotion: ":-)",
            text: "Not what I expected",
            page_id: "6",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 4))).toString()
        }
    ]);

    const secondData = toChartCoordinates([
        {
            emotion: ":-)",
            text: "This was good",
            page_id: "7",
            created_at: today.toString()
        },
        {
            emotion: ":-(",
            text: "This was good",
            page_id: "8",
            created_at: today.toString()
        },
        {
            emotion: ":-|",
            text: "This was ok",
            page_id: "9",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 2))).toString()
        },
        {
            emotion: ":-(",
            text: "Not what I expected",
            page_id: "10",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 1))).toString()
        },
        {
            emotion: ":-|",
            text: "Not what I expected",
            page_id: "11",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 2))).toString()
        },
        {
            emotion: ":-)",
            text: "Not what I expected",
            page_id: "12",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 3))).toString()
        }
    ]);

    const thirdData = toChartCoordinates([
        {
            emotion: ":-)",
            text: "This was good",
            page_id: "13",
            created_at: today.toString()
        },
        {
            emotion: ":-(",
            text: "This was good",
            page_id: "14",
            created_at: today.toString()
        },
        {
            emotion: ":-|",
            text: "This was ok",
            page_id: "15",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 1))).toString()
        },
        {
            emotion: ":-(",
            text: "Not what I expected",
            page_id: "16",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 1))).toString()
        },
        {
            emotion: ":-|",
            text: "Not what I expected",
            page_id: "17",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 3))).toString()
        },
        {
            emotion: ":-)",
            text: "Not what I expected",
            page_id: "18",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 0))).toString()
        }
    ]);


    //TODO: test this 
    const averageCoordinates = (current: ReseponseModel, all: ReseponseModel[]) => {

        const until = all.splice(all.indexOf(current), all.length);
        const sum = until
            .map(response => emotionToNumeric(response.emotion))
            .reduce((previous, current) => previous + current);
        const average = sum / until.length

        return {
            x: daysSince(current.created_at),
            y: average
        }
    }

    return <div>
        <div>
            Samlet utvikling
            <VictoryChart
                theme={VictoryTheme.material}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
            >
                <VictoryArea data={responses} style={{ data: { fill: "orange", opacity: 0.7 } }} />
                <VictoryArea data={secondData} style={{ data: { fill: "tomato", opacity: 0.7 } }} />
                <VictoryArea data={thirdData} style={{ data: { fill: "green", opacity: 0.7 } }} />
            </VictoryChart>
        </div>
        <div>
            Mottatt, Uke:
            <VictoryChart
                theme={VictoryTheme.material}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
            >
                <VictoryArea data={responses} style={{ data: { fill: "orange", opacity: 0.7 } }} />
                <VictoryArea data={secondData} style={{ data: { fill: "tomato", opacity: 0.7 } }} />
                <VictoryArea data={thirdData} style={{ data: { fill: "green", opacity: 0.7 } }} />
            </VictoryChart>
        </div>
    </div>

}