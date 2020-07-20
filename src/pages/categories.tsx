import { Button } from "rebass";
import { TooltipHelpProvider } from "tooltip-help-react"
import * as text from "../text";
import Tippy from "@tippyjs/react";
import { CategoryCreator } from "../components/Category/categoryCreator";


export default () => {

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

    return <CategoriesTooltipProvider>
        <CategoryCreator />
    </CategoriesTooltipProvider >
};