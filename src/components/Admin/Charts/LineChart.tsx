import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from "victory";
import { useEffect, useState } from "react";
import { OK } from "node-kall"
import { PageInformation } from "../../../context/CompareContext";
import { getLineCoordinates } from "../../../fetchers";
import { asyncEffect } from "../../../effects/asyncEffect";


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

    /*
        NOTE: Lines not getting updated. 
        I have posted [an issue](https://github.com/FormidableLabs/victory/issues/1667). 
        Waiting for awhile, seeing if the Victory-maintainer sees something I don't. 
    */
    console.log("GOing for coordinatse", coordinates);
    return coordinates.length === 0 ?
        null :
        <VictoryLine
            name={`line_${page.id}`}
            style={{
                data: { stroke: page.color ? page.color : "cyan", strokeWidth: 5 }
            }}
            data={coordinates}
            labelComponent={< VictoryLabel dx={10} dy={15} renderInPortal />}
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
