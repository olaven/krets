import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContext } from "../../context/AdminPageContext";
import { Box, Flex, Text } from "rebass";
import { LoginButton } from "../tiny/buttons";
import { TextList } from "./TextList/TextList";
import { Charts } from "./Charts/Charts";
import * as text from "../../text"
import { CompareSelect } from "./CompareSelect";
import { useResponses } from "../../effects/useResponses";
import { emotionToNumeric } from "./Charts/ChartUtils";

const AdminBox = props => <Box
    width={props.width ? props.width : [1, 1 / 2]}
    p={[1, 2, 3]}
>
    {props.children}
</Box>

const AverageScore = () => {

    const { page } = useContext(AdminPageContext);
    const [responses] = useResponses(page.id);

    const [average, setAverage] = useState<number>(0);

    //TODO: move this to backend SQL query 
    useEffect(() => {

        if (responses.length === 0)
            return;

        if (responses.length === 1) {

            const [response] = responses;
            setAverage(
                emotionToNumeric(response.emotion));
        } else {

            const sum = responses
                .map(({ emotion }) => emotion)
                .map(emotionToNumeric)
                .reduce((a, b) => a + b)

            const roundedAverage = Math.round((sum / responses.length) * 10) / 10
            setAverage(roundedAverage);
        }
    }, [responses.length])

    return <Text>
        Gjennomsnittlig score: {average}/3
    </Text>
}

const AdminContent = () => <Flex flexWrap="wrap">
    <AdminBox width={1}>
        <CompareSelect />
    </AdminBox>
    <AdminBox>
        <AverageScore />
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