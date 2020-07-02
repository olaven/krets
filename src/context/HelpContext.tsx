import React, { createContext, ReactElement, useState } from "react";
import * as text from "../text";
import { Button, Box, BoxProps } from "rebass";
import Tippy from "@tippyjs/react";


interface IHelpContext {
    /**
     * Button triggering context-wide
     * `Tooltip`-visibility
     */
    HelpButton: (props: BoxProps) => ReactElement,
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

    const ButtonBase = ({ text, onClick }) => <Button
        width={1}
        onClick={onClick}
        backgroundColor="attention" >
        {text}
    </Button >

    const HelpButton = (props) => predicate() ? <Box {...props}>
        {visible ?
            <ButtonBase
                text={text.tooltips.understoodButton}
                onClick={() => { setVisible(false) }} /> :
            <ButtonBase
                text={text.tooltips.showHelpButton}
                onClick={() => { setVisible(true) }} />
        }
    </Box> : null



    return <HelpContext.Provider value={{ HelpButton, Tooltip }}>
        {children}
    </HelpContext.Provider>
};

