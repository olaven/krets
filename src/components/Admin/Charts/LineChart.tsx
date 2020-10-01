import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from "victory";
import { useState } from "react";
import { filterBody } from "node-kall"
import { PageInformation } from "../../../context/CompareContext";
import { getLineCoordinates } from "../../../fetchers";
import { asyncEffect } from "../../../effects/asyncEffect";


export const LineChart = ({ pageInformations }: { pageInformations: PageInformation[] }) => {

    const [pageWithCoordinates, setPageWithCoordinates] = useState([]);

    asyncEffect(async () => {

        const pageWithCoordinates = await Promise.all(
            pageInformations.map(({ page }) => page)
                .map(async page => ({ page, coordinates: await filterBody(getLineCoordinates(page.id)) }))
        )

        setPageWithCoordinates(pageWithCoordinates);
    }, [pageInformations.length]);

    console.log(pageWithCoordinates)

    return <span
        aria-label="line-chart-label">
        <VictoryChart
            domainPadding={{ y: 10 }}
            domain={{ y: [0, 2] }}
        >
            <VictoryAxis
                dependentAxis
                tickValues={[0, 1, 2]}
                tickFormat={tick => [":-(", ":-|", ":-)"][tick]} //TODO: Proper emoji
            />

            <VictoryAxis
                axisLabelComponent={<VictoryLabel />}
                tickCount={3}
                tickFormat={tick => {
                    const date = new Date(tick);
                    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
                }}
            />

            {pageWithCoordinates.map(({ page, coordinates }) => <VictoryLine
                key={page.id}
                name={`line_${page.id}`}
                style={{
                    data: { stroke: page.color ? page.color : "cyan", strokeWidth: 5 }
                }}
                data={coordinates}
                labelComponent={< VictoryLabel dx={10} dy={15} renderInPortal />}
                interpolation={"natural"}
            />)}
        </VictoryChart>
    </span>

}