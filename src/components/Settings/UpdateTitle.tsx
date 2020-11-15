import * as text from "../../text";
import { NO_CONTENT } from "node-kall";
import { useContext, useState, useEffect } from "react";
import { HomeContext } from "../../context/HomeContext";
import { putPage } from "../../fetchers";
import { TriggerLoadingButton } from "../standard/buttons";
import { ColumnContainer } from "../standard/Containers";
import { TextInput } from "../standard/Input";
import { PageModel } from "../../models/models";


export const UpdateTitle = () => {

    const getTitle = (page: PageModel) => page.custom_title 
        ? page.custom_title :
        `${text.response.header} ${page.name}`

    const { page, updatePage } = useContext(HomeContext);
    const [title, setTitle] = useState(
        getTitle(page)
    );

    useEffect(() => {

        setTitle(
            getTitle(page)
        );
    }, [page]) 

    const updateTitle = async () => {

        const [status] = await putPage({
            ...page,
            custom_title: title
        });

        if (status !== NO_CONTENT)
            console.warn(`${status} when updating page title`);
        //updatePage(); //NOTE: Not needed, as the update title only is shown in the input field where it's already entered
    }

    return <ColumnContainer>
        <TextInput
            id='name'
            name='name'
            value={title}
            onChange={(event) => { setTitle(event.target.value) }} />
        <TriggerLoadingButton
            text={text.settings.changeTitleButton}
            action={updateTitle} />
    </ColumnContainer>

}