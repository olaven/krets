import { NO_CONTENT } from "node-kall";
import { useContext } from "react";
import * as text from "../../helpers/text";
import { deletePage } from "../../helpers/fetchers";
import { DoubleConfirmationButton } from "../standard/buttons";
import { HomeContext } from "../../context/HomeContext";
import { PagesContext } from "../../context/PagesContext";

export const DeletePage = () => {
    
    const { selectedPage, setSelectedPage } = useContext(HomeContext);
    const { removePage } = useContext(PagesContext);

    const performDeletion = async () => {

        const [status] = await deletePage(selectedPage.id);
        if (status === NO_CONTENT) {

            removePage(selectedPage);
            setSelectedPage(null); 
        } else {

            alert(text.settings.deleteError)
        }
    }

    return <DoubleConfirmationButton
        text={text.settings.deletePageButton}
        action={performDeletion}
    />
}