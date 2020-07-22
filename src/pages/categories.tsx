import { Button } from "rebass";
import { TooltipHelpProvider } from "tooltip-help-react"
import * as text from "../text";
import Tippy from "@tippyjs/react";
import { CategoryCreator } from "../components/Category/categoryCreator";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CategoriesContextProvider } from "../context/CategoriesContext";
import { CategoryList } from "../components/Category/categoryList";


const CategoriesTooltipProvider = ({ children }) => <TooltipHelpProvider
    predicate={() => true}
    renderButton={(visible) => <Button
        width={1}
        backgroundColor="attention" >
        {visible ? text.tooltips.understoodButton : text.tooltips.helpButton}
    </Button >}
    renderTooltip={(visible, children, content) => <Tippy visible={visible} content={content}>
        {children}
    </Tippy>}
>
    {children}
</TooltipHelpProvider>

export default () => {

    const { user } = useContext(UserContext);

    if (!user) {
        return <>
            Denne siden er ikke tilgjengelig uten bruker
        </>
    }

    return <CategoriesContextProvider user={user}>
        <CategoriesTooltipProvider>
            <CategoryCreator />
            <CategoryList />
        </CategoriesTooltipProvider >
    </CategoriesContextProvider>
};