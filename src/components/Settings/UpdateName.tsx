import * as text from "../../text"
import { NO_CONTENT } from "node-kall"
import { useContext, useState } from "react"
import { HomeContext } from "../../context/HomeContext"
import { putPage } from "../../fetchers"
import { TriggerLoadingButton } from "../standard/buttons"
import { TextInput } from "../standard/Input";
import { styled } from "../../stiches.config"
import { ColumnContainer } from "../standard/Containers"


export const UpdateName = () => {

    const { page, updatePage } = useContext(HomeContext);
    const [name, setName] = useState(page.name);

    const updateName = async () => {

        const [status] = await putPage({ ...page, name });
        if (status !== NO_CONTENT)
            console.warn(`${status} when updating page name`);
        await updatePage();
    }

    return <ColumnContainer>
        <TextInput
            id='name'
            name='name'
            value={name}
            onChange={(event) => { setName(event.target.value) }} />
        <TriggerLoadingButton
            text={text.settings.changeNameButton}
            action={updateName} />
    </ColumnContainer>
}