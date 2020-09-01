import React, { useContext } from "react";
import { TooltipHelpProvider } from "tooltip-help-react";
import Tippy from "@tippyjs/react";
import { Button } from "rebass";
import * as text from "../../../text"
import { PagesContext } from "../../../context/PagesContext";


//TODO: `PageTooltipProvider` looks messy. Figure out a way to clean up.
/**
 * A wrapper around `TooltipHelpProvider` customized for `PageSection`
 */
export const HomeTooltipProvider = ({ pageCount, children }) => <TooltipHelpProvider
    predicate={() => {

        const { pages, hasLoaded } = useContext(PagesContext);
        return hasLoaded && pages.length === pageCount
    }}
    renderButton={visible => <Button
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