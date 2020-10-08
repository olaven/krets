import { filterBody } from "node-kall"
import { VictoryChart, VictoryBar, VictoryAxis, Box } from "victory";
import { PageInformation } from "../../../context/CompareContext";
import * as text from "../../../text";
import { getOverallAverage } from "../../../fetchers";
import { useState } from "react";
import { asyncEffect } from "../../../effects/asyncEffect";



export const DistributionChart = ({ pageInformations }: { pageInformations: PageInformation[] }) => {

    const [coordinates, setCoordinates] = useState([]);

    asyncEffect(async () => {

        /* //TODO: cut the `pageInformaitons`-idea entirely once server side calculation is merged - `pages` is enough
        const pageWithAverage = await Promise.all(pageInformations
            .map(({ page }) => page)
            .map(async page => ({ page: page, average: await filterBody(getOverallAverage(page.id)) })))

        setPageWithAverage(pageWithAverage); */
    }, [pageInformations.length]);

    return <span aria-label="bar-chart-label">
        <VictoryChart
            animate={{
                duration: 2000,
                onLoad: { duration: 500 }
            }}
            domainPadding={{ x: 15 }}
        >
            {coordinates.map((coordinate) =>
                <VictoryBar
                    key={coordinate.x}
                    data={[coordinate]} //TODO: depend on smiley?
                    style={{ data: { fill: "orange", opacity: 0.7 } }} />
            )}
        </VictoryChart>
    </span>
}