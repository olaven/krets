import { filterBody, OK } from "node-kall"
import { VictoryChart, VictoryBar, VictoryAxis, Box } from "victory";
import { PageInformation } from "../../../context/CompareContext";
import * as text from "../../../helpers/text";
import { getEmojiDistribution, getOverallAverage } from "../../../helpers/fetchers";
import { useContext, useState } from "react";
import { asyncEffect } from "../../../effects/asyncEffect";
import { AdminPageContext } from "../../../context/AdminPageContext";
import { DistributionModel } from "../../../models/models";
import { emojidata } from "../../../helpers/emojidata";



export const DistributionChart = () => {

    const { page } = useContext(AdminPageContext);
    const [distribution, setDistribution] = useState<DistributionModel>();

    asyncEffect(async () => {

        if (!page) return;

        const [status, distribution] = await getEmojiDistribution(page.id);

        if (status === OK)
            setDistribution(distribution);
        else
            console.error(`${status} when fetching distribution`);

    }, [page]);

    return <span aria-label="distribution-chart-label">
        <VictoryChart
            animate={{
                duration: 2000,
                onLoad: { duration: 500 }
            }}
            domainPadding={{ x: 55 }}
        >
            <VictoryAxis />
            <VictoryAxis dependentAxis
            />

            {distribution && <VictoryBar
                data={[
                    {
                        x: ":-)",
                        y: parseInt(distribution.happy),
                    },
                    {
                        x: ":-|",
                        y: parseInt(distribution.neutral),
                    },
                    {
                        x: ":-(",
                        y: parseInt(distribution.sad),
                    },
                ]}
                style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 } }}
            />}

        </VictoryChart>
    </span>
}