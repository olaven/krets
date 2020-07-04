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

    //NOTE: questionable gain by turning this into an HOF instead of just passing it as props.. I should reconsider this.
    const modifyVisibility = (visible: boolean) =>
        () => {
            setVisible(visible)
        }

    const HelpButton = (props: any) => predicate() ? <Box {...props}>
        {visible ?
            <ButtonBase
                text={text.tooltips.understoodButton}
                onClick={modifyVisibility(false)} /> :
            <ButtonBase
                text={text.tooltips.showHelpButton}
                onClick={modifyVisibility(true)} />
        }
    </Box> : null



    return <HelpContext.Provider value={{ HelpButton, Tooltip }}>
        {children}
    </HelpContext.Provider>
};

