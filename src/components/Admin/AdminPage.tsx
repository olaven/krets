import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContext } from "../../context/AdminPageContext";
import { Box, Flex, Text } from "rebass";
import { OK } from "node-kall";
import { LoginButton } from "../tiny/buttons";
import { TextList } from "./TextList/TextList";
import { Charts } from "./Charts/Charts";
import * as text from "../../text"
import { CompareSelect } from "./CompareSelect";
import { getOverallAverage } from "../../fetchers";

const AdminBox = props => <Box
    width={props.width ? props.width : [1, 1 / 2]}
    p={[1, 2, 3]}
>
    {props.children}
</Box>

const AverageScore = () => {

    const { page } = useContext(AdminPageContext);

    const [average, setAverage] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const [status, average] = await getOverallAverage(page.id)
            if (status === OK) {

                const rounded = Math.round(average * 10) / 10;
                setAverage(rounded);
            } else {

                console.warn(`Error fetching average: ${status}`);
            }
        })()
    }, [])

    return <Text>
        Gjennomsnittlig score: {average + 1}/3
    </Text>
}

const AdminContent = () => <Flex flexWrap="wrap">
    <AdminBox width={1}>
        <AverageScore />
    </AdminBox>
    <AdminBox>
        <CompareSelect />
        <Charts />
    </AdminBox>
    <AdminBox>
        <TextList />
    </AdminBox>
</Flex>

export const AdminPage = () => {

    const { user } = useContext(UserContext);
    const { page, pageLoading } = useContext(AdminPageContext);

    if (pageLoading) {
        return <AdminBox>
            {text.adminPage.loading}
        </AdminBox>
    }

    if (!user) {
        return <LoginButton />
    }

    if (page && user.sub !== page.owner_id)
        return <AdminBox>
            {text.adminPage.notOwning}
        </AdminBox>;

    return <AdminContent />
}