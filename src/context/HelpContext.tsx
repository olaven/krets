import React, { createContext, ReactElement, useState } from "react";
import * as text from "../text";
import { Button } from "rebass";
import Tippy from "@tippyjs/react";


interface IHelpContext {
    /**
     * Button triggering context-wide
     * `Tooltip`-visibility
     */
    HelpButton: () => ReactElement,
    /**
     * Tooltip to be wrapped around other 
     * elements. 
     */
    Tooltip: ({ content, children }) => ReactElement
}
const defaultValues: IHelpContext =
    { HelpButton: null, Tooltip: null };

export const HelpContext = createContext<IHelpContext>(defaultValues);

/**
 * Provides an interface to control Tooltips. 
 * @param predicate deciding wether `HelpButton` should be visible or not
 * @returns {IHelpContext}
 */
export const HelpContextProvider = ({ predicate, children }) => {

    const [visible, setVisible] = useState(false);

    const Tooltip = ({ content, children }) => <Tippy
        content={content}
        visible={visible}>
        {children}
    </Tippy>

    const HelpButton = () => predicate() ?
        visible ?
            <Button onClick={() => { setVisible(false) }} backgroundColor="attention">
                {text.tooltips.understoodButton}
            </Button> :
            <Button onClick={() => { setVisible(true) }} backgroundColor="attention">
                {text.tooltips.showHelpButton}
            </Button> :
        null


    return <HelpContext.Provider value={{ HelpButton, Tooltip }}>
        {children}
    </HelpContext.Provider>
};

