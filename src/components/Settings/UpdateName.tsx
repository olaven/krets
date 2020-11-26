import * as text from "../../helpers/text"
import { useContext, useEffect, useState } from "react"
import { HomeContext } from "../../context/HomeContext"
import { TriggerLoadingButton } from "../standard/buttons"
import { TextInput } from "../standard/Input";
import { ColumnContainer } from "../standard/Containers"
import { usePageUpdater } from "./usePageUpdater"


export const UpdateName = () => {

    const { selectedPage } = useContext(HomeContext);
    const [name, setName] = useState(selectedPage.name);
    const pageUpdater = usePageUpdater();

    useEffect(() => {

        setName(selectedPage.name);
    }, [selectedPage]) 

    const updateName = () => pageUpdater({
        ...selectedPage, 
        name,
    });

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