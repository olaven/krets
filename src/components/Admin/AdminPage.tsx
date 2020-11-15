import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContext } from "../../context/AdminPageContext";
import { Box, Flex, Text } from "rebass";
import { OK } from "node-kall";
import { LoginButton } from "../standard/buttons";
import { TextList } from "./TextList/TextList";
import { Charts } from "../Charts";
import * as text from "../../text"
import { CompareSelect } from "./CompareSelect";
import { getCount, getOverallAverage } from "../../fetchers";
import { Loader } from "../standard/loader";

const AdminBox = props => <Box
    width={props.width ? props.width : [1, 1 / 2]}
    p={[1, 2, 3]}
>
    {props.children}
</Box>

const ResponseCount = () => {

    const { page } = useContext(AdminPageContext);

    const [count, setCount] = useState(0);

    useEffect(() => {
        (async () => {
            const [status, body] = await getCount(page.id)
            if (status === OK) {

                setCount(body.count);
            } else {

                console.warn(`Error fetching count: ${status}`);
            }
        })()
    }, []);

    return <Text>
        {text.adminPage.count} {count}
    </Text>
}


const AverageScore = () => {

    const { page } = useContext(AdminPageContext);

    const [average, setAverage] = useState(0);

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
        {text.adminPage.average} {average + 1}/3
    </Text>
}

const AdminContent = () => <Flex flexWrap="wrap">
    <AdminBox width={1}>
        <AverageScore />
        <ResponseCount />
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

    const { authUser } = useContext(UserContext);
    const { page } = useContext(AdminPageContext);

    if (!page) {
        return <Loader size={150} />
    }

    if (!authUser) {
        return <LoginButton />
    }

    if (page && authUser.sub !== page.owner_id)
        return <AdminBox>
            {text.adminPage.notOwning}
        </AdminBox>;

    return <AdminContent />
}