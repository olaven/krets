import React, { createContext, ReactElement, useState } from "react";
import { Box } from "victory";
import { Button } from "rebass";
import Tippy from "@tippyjs/react";


interface ContextInterface {
    //    visible: boolean,
    HelpButton: () => ReactElement,
    Tooltip: ({ content, children }) => ReactElement
}
const defaultValues: ContextInterface =
    { /* visible: false, */ HelpButton: null, Tooltip: null };

export const HelpContext = createContext<ContextInterface>(defaultValues);

/**
 * Provides an interface to control tootips. 
 * A `HelpButton` is returned if `predicate` is true. 
 * `HelpButton` toggles `visible`, which may be used to show help 
 * accross components. 
 * @param predicate deciding wether button should be visible
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
            <Button onClick={() => { setVisible(false) }}>
                Skjoenner
                </Button> :
            <Button onClick={() => { setVisible(true) }}>
                Vis hjelp
            </Button> :
        null


    return <HelpContext.Provider value={{ HelpButton, Tooltip }}>
        {children}
    </HelpContext.Provider>
};

