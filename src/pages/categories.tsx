import { useState, useContext } from "react";
import { Flex, Box, Button } from "rebass";
import { Input } from "@rebass/forms";
import { TooltipHelpProvider, TooltipHelp } from "tooltip-help-react"
import * as text from "../text";
import Tippy from "@tippyjs/react";

const CategoryCreator = () => {

    const [name, setName] = useState("");
    const { HelpButton, Tooltip } = useContext(TooltipHelp)

    return <>
        <HelpButton />
        <Flex py={[1, 2, 3]}>

            <Box width={1 / 3} />
            <Box as='form' onSubmit={e => e.preventDefault()} width={2 / 4}>

                <Flex>
                    <Input aria-label="pagename-input" placeholder={"lag ny kategori"} onChange={({ target: { value } }) => {
                        setName(value)
                    }} value={name} />
                    <Button mx={[0, 2, 3]} width={1 / 3} onClick={() => { console.log("TODO") }} aria-label={"create-button"}>
                        {text.pageCreator.button}
                    </Button>
                </Flex>

            </Box>
            <Box width={1 / 3} />
        </Flex>
    </>
}


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