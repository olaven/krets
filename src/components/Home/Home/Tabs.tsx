import { ReactElement, useEffect, useState } from "react";
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
                boxShadow: "0px 4px 5px grey;"
            }
        }
    }
});

type Props = {
    elements: {
        label: string,
        Component: ReactElement,
    }[],
    setComponent: (component: ReactElement) => any,
}
export const Tabs = ({ elements, setComponent }: Props) => {

    if (elements.length <= 0) throw "please specify elements to `Tabs`"

    const [selected, setSelected] = useState(elements[0].label)

    //NOTE: selecting first component by defualt 
    useEffect(() => {

        setComponent(elements[0].Component);
    }, []);

    return <RowContainer>{
        elements.map(element =>
            //@ts-ignore
            <TabButton
                key={element.label}
                onClick={() => {
                    setComponent(element.Component);
                    setSelected(element.label)
                }}
                selected={element.label === selected}
            >
                {element.label}
            </TabButton>
        )
    }</RowContainer >
}