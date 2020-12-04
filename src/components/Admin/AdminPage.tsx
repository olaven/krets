import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContext } from "../../context/AdminPageContext";
import { OK } from "node-kall";
import { LoginButton } from "../standard/buttons";
import { TextList } from "./TextList/TextList";
import { Charts } from "../Charts";
import * as text from "../../helpers/text"
import { CompareSelect } from "./CompareSelect";
import { getCount, getOverallAverage } from "../../helpers/fetchers";
import { Loader } from "../standard/loader";
import { ColumnContainer, RowContainer } from "../standard/Containers";
import { Paragraph } from "../standard/Text";
import { styled } from "../../stiches.config";


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

    return <Paragraph>
        {text.adminPage.count} {count}
    </Paragraph>
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

    return <Paragraph>
        {text.adminPage.average} {average + 1}/3
    </Paragraph>
}


const Container = styled(RowContainer, {
    justifyContent: "space-between",
})
const AdminContent = () => <Container>
    <ColumnContainer>
        <div>
            <AverageScore />
            <ResponseCount />
        </div>
        <div>
            <CompareSelect />
            <Charts />
        </div>
    </ColumnContainer>
    <TextList />
</Container>

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
        return <>
            {text.adminPage.notOwning}
        </>;

    return <AdminContent />
}