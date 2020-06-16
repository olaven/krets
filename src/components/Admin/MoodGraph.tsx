import { VictoryLine, VictoryArea, VictoryAxis, VictoryChart, VictoryTheme } from "victory";
import { useContext } from "react";
import { AdminPageContext } from "../../context/AdminPageContext";
import { ReseponseModel, Emotion } from "../../models";

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
            page_id: "id",
            created_at: today.toString()
        },
        {
            emotion: ":-)",
            text: "This was good",
            page_id: "id",
            created_at: today.toString()
        },
        {
            emotion: ":-|",
            text: "This was ok",
            page_id: "id",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 3))).toString()
        },
        {
            emotion: ":-(",
            text: "Not what I expected",
            page_id: "id",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 4))).toString()
        },
        {
            emotion: ":-)",
            text: "Not what I expected",
            page_id: "id",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 2))).toString()
        },
        {
            emotion: ":-)",
            text: "Not what I expected",
            page_id: "id",
            created_at: new Date(today.getTime() - (1000 * 60 * 60 * (24 * 4))).toString()
        }
    ]);

    return <div>
        <VictoryLine
            data={responses}
            animate={{
                duration: 2000,
                onLoad: { duration: 100 }
            }}
        />
        <VictoryChart
            theme={VictoryTheme.material}
        >
            <VictoryArea data={responses} />
            <VictoryAxis />
        </VictoryChart>
    </div>

}