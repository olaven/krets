import React, { createContext, ReactElement, useState } from "react";
import { PageModel, ReseponseModel } from "../models";
import { usePage } from "../effects/usePage";
import { useResponses } from "../effects/useResponses";
import { Box } from "victory";
import { Button } from "rebass";


interface ContextInterface {
    visible: boolean,
    HelpButton: Element | null,
}
const defaultValues: ContextInterface =
    { visible: false, HelpButton: null };

export const HelpContext = createContext<ContextInterface>(defaultValues);

export const HelpContextProvider = ({ predicate, children }) => {

    const [visible, setVisible] = useState(false);

    const HelpButton = () => predicate() ?
        <Box aria-label="explanation-section">
            {visible ?
                <Button onClick={() => { setVisible(false) }} /> :
                <Button onClick={() => { setVisible(true) }} />}
        </Box> :
        null


    return <HelpContext.Provider value={{ visible, HelpButton: <HelpButton /> }}>
        {children}
    </HelpContext.Provider>
};

