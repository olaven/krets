import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from "victory";
import { PageInformation } from "../../../context/CompareContext";
import { OK } from "node-kall"
import { getLineCoordinates } from "../../../fetchers";
import { useState } from "react";
import { asyncEffect } from "../../../effects/useProducts";


const PageLine = ({ page }) => {

    const [coordinates, setCoordinates] = useState([]);

    asyncEffect(async () => {

        const [status, coordinates] = await getLineCoordinates(page.id);
        console.log("Fetched seomthing, ", coordinates);
        if (status === OK) {

            setCoordinates(coordinates);
        } else {

            console.error(`${status} when fetching line coordinates..`);
        }
    }, []);

    console.log("coordinates rendering: ", coordinates)
    return <VictoryLine
        name={`line_${page.id}`}
        style={{
            data: { stroke: page.color ? page.color : "cyan", strokeWidth: 5 }
        }}
        data={coordinates}
        labelComponent={<VictoryLabel dx={10} dy={15} renderInPortal />}
        interpolation={"natural"}
    />
}

export const LineChart = ({ pageInformations }: { pageInformations: PageInformation[] }) => <span
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

        {pageInformations.map(({ page }) =>
            <PageLine key={page.id} page={page} />
        )}
        {/* {pageInformations.map(({ page }) =>
            <PageLine key={page.id} page={page} />
        )} */}
    </VictoryChart>
</span>
