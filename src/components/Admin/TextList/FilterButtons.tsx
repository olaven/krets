import { Flex, Button } from "rebass";
import Emoji from "react-emoji-render";
import { useState, useEffect } from "react";

const FilterButton = ({ emotion, selected, setSelected }) => {

    const [active, setActive] = useState(true);

    useEffect(() => {

        setSelected(
            active ?
                [emotion, ...selected] :
                selected.filter(e => e !== emotion)
        )
    }, [active]);

    const onClick = () => {

        setActive(!active);

    }

    return <Button onClick={onClick}
        backgroundColor={active ? "primary" : "inactive"}
        m={[0, 1, 2]} >
        <Emoji text={emotion} />
    </Button >
}

export const FilterButtons = ({ selected, setSelected }) => <Flex m={"auto"}>
    <FilterButton
        selected={selected}
        setSelected={setSelected}
        emotion={":-)"} />
    <FilterButton
        selected={selected}
        setSelected={setSelected}
        emotion={":-|"} />
    <FilterButton
        selected={selected}
        setSelected={setSelected}
        emotion={":-("} />
</Flex>