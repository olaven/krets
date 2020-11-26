import { NO_CONTENT } from "node-kall";
import { useContext } from "react";
import { putPage } from "../../helpers/fetchers"
import { PageModel } from "../../models/models";
import { HomeContext } from "../../context/HomeContext";

export const usePageUpdater = () => {

    const { setSelectedPage } = useContext(HomeContext); 

    return async (page: PageModel) => {

        
        const [status] = await putPage(page);

        if (status !== NO_CONTENT)
            console.warn(`${status} when updating page title`);
        else 
            setSelectedPage(page);
    }
}