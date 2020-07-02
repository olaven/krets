import React, { createContext, ReactElement, useState } from "react";
import { Box } from "victory";
import { Button } from "rebass";


interface ContextInterface {
    visible: boolean,
    HelpButton: () => ReactElement,
}
const defaultValues: ContextInterface =
    { visible: false, HelpButton: null };

export const HelpContext = createContext<ContextInterface>(defaultValues);

export const HelpContextProvider = ({ predicate, children }) => {

    const [visible, setVisible] = useState(false);

    const HelpButton = () => predicate() ?
        visible ?
            <Button onClick={() => { setVisible(false) }}>
                Skjoenner
                </Button> :
            <Button onClick={() => { setVisible(true) }}>
                Vis hjelp
            </Button> :
        null


    return <HelpContext.Provider value={{ visible, HelpButton }}>
        {children}
    </HelpContext.Provider>
};

