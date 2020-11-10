import { useToggle } from "../../../effects/useToggle";
import { styled } from "../../../stiches.config";
import { Button } from "../../standard/Button";
import { RowContainer } from "../../standard/Containers";


const TabButton = styled(Button, {

    width: "100%",

    variants: {
        selected: {
            true: {
                color: "$primary",
                backgroundColor: "$secondary",
                borderColor: "$primary",
                borderStyle: "solid",
                transform: "scale(1.1)",
                boxShadow: "4px 4px 1px grey;"
            }
        }
    }
})

export const Tabs = () => {

    const [s, toggle] = useToggle(false)

    return <RowContainer>
        <TabButton selected={!s} onClick={toggle}>first thing</TabButton>
        <TabButton selected={s} onClick={toggle}>Second thing</TabButton>
    </RowContainer>
}