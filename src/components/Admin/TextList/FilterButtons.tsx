import { Flex, Button } from "rebass";
import Emoji from "react-emoji-render";
import { useState, useEffect } from "react";

const FilterButton = ({ emotion, selected, setSelected }) => {

    const [active, setActive] = useState(true);

    useEffect(() => {

        if (active) {
            if (!selected.includes(emotion)) {
                setSelected(
                    [emotion, ...selected]
                );
            }
        } else {

            setSelected(
                selected.filter(e => e !== emotion)
            );
        }

    }, [active]);

    return <Button onClick={
        () => { setActive(!active) }
    }
        backgroundColor={active ? "primary" : "inactive"}
        m={[0, 1, 2]}
        sx={{
            boxShadow: "large",
        }} >

        <Emoji text={emotion} />
    </Button>
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