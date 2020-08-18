import { filterBody } from "node-kall"
import { VictoryChart, VictoryBar, VictoryAxis, Box } from "victory";
import { PageInformation } from "../../../context/CompareContext";
import * as text from "../../../text";
import { getOverallAverage } from "../../../fetchers";
import { useState } from "react";
import { asyncEffect } from "../../../effects/asyncEffect";


const Axis = () => <>
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
        }} />
</>


export const BarChart = ({ pageInformations }: { pageInformations: PageInformation[] }) => {

    const [pageWithAverage, setPageWithAverage] = useState([]);

    asyncEffect(async () => {

        //TODO: cut the `pageInformaitons`-idea entirely once server side calculation is merged - `pages` is enough
        const pageWithAverage = await Promise.all(pageInformations
            .map(({ page }) => page)
            .map(async page => ({ page: page, average: await filterBody(getOverallAverage(page.id)) })))

        setPageWithAverage(pageWithAverage);
    }, [pageInformations.length]);

    return <span aria-label="bar-chart-label">
        <VictoryChart
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
            }}
            domainPadding={{ x: 15 }}
        >
            {pageWithAverage.map(({ page, average }) =>
                <VictoryBar
                    key={page.id}
                    data={[{ x: page.name, y: average }]}
                    style={{ data: { fill: page.color || "orange", opacity: 0.7 } }} />
            )}
            <Axis />
        </VictoryChart>
    </span>
}