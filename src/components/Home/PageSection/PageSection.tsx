import React, { useContext, Children } from "react";
import { TooltipHelpProvider } from "tooltip-help-react";
import Tippy from "@tippyjs/react";
import { Button } from "rebass";
import * as text from "../../../text"
import { PagesContextProvider, PagesContext } from "../../../context/PagesContext";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";


//TODO: `PageTooltipProvider` looks messy. Figure out a way to clean up.
/**
 * A wrapper around `TooltipHelpProvider` customized for `PageSection`
 */
const PageTooltipProvider = ({ pageCount, children }) => <TooltipHelpProvider
    predicate={() => {

        const { pages } = useContext(PagesContext);
        return pages.length === pageCount
    }}
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


export const PageSection = ({ user }) => <PagesContextProvider user={user}>
    <PageTooltipProvider pageCount={0}>
        <PageCreator />
    </PageTooltipProvider>
    <PageTooltipProvider pageCount={1}>
        <PageList />
    </PageTooltipProvider >
</PagesContextProvider >; 
