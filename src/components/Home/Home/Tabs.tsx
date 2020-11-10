import { styled } from "../../../stiches.config";
import { Button } from "../../standard/Button";
import { RowContainer } from "../../standard/Containers";


const TabButton = styled(Button, {
    variants: {
        selected: {
            true: {
                color: 'red'
            },
            false: {
                color: 'orange'
            }
        }
    }
})

export const Tabs = () => <RowContainer>
    <TabButton selected={true}>first thing</TabButton>
    <TabButton selected={false}>Second thing</TabButton>
</RowContainer>