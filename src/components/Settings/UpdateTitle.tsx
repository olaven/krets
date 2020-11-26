import * as text from "../../helpers/text";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import { TriggerLoadingButton } from "../standard/buttons";
import { ColumnContainer } from "../standard/Containers";
import { TextInput } from "../standard/Input";
import { PageModel } from "../../models/models";
import { usePageUpdater } from "./usePageUpdater";


const getTitle = (page: PageModel) => page.custom_title 
    ? page.custom_title :
    `${text.response.header} ${page.name}`


export const UpdateTitle = () => {


    const { selectedPage } = useContext(HomeContext);
    const [title, setTitle] = useState(
        getTitle(selectedPage)
    );

    const pageUpdater = usePageUpdater();

    useEffect(() => {

        setTitle(
            getTitle(selectedPage)
        );
    }, [selectedPage]) 

    const updateTitle = () => pageUpdater({
        ...selectedPage, 
        custom_title: title, 
    });

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