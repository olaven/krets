import React, { useContext } from "react";
import { HomeContext } from "../../../../context/HomeContext";
import { styled, css } from "../../../../stiches.config";
import { ToQR, ToPage } from "../../../standard/buttons";
import * as uiText from "../../../../helpers/text"
import { Button } from "../../../standard/Button";
import { RowContainer, ColumnContainer } from "../../../standard/Containers";
import { H2 } from "../../../standard/Heading";

const Margin = styled("div", {
    margin: "$21",
    marginBottom: "0px",
});

const Card = styled(RowContainer, {
    borderRadius: "15px",
    border: "solid black 1px",
    width: "100%",
    justifyContent: "space-between",
    transitionTimingFunction: "ease",
    transitionDuration: "100ms",
    marginBottom: "$21",

    ":hover": {
        transform :"scale(1.05)",
    },
});

const LeftContainer = styled(ColumnContainer, {

    alignItems: "center",
    width: "66%",
});

const RightContainer = styled(ColumnContainer, {

    justifyContent: "center",
    width: "33%",
});

const SelectButton = styled(Button, {

    width: "68%",
    alignSelf: "left",
    marginLeft: "$8",
    border: "solid $primary",
    margin: "$5",
    boxShadow: "4px 4px 8px grey",

    ":hover": {
        transform: "scale(1.05)",
        boxShadow: "4px 4px 5px grey",
    },
});

const random = (max: number) => Math.floor(Math.random() * max + 1);
const FadeIn = styled("div", {
    animationDuration: `800ms`,
    animmationDirection: "forwards",
    animationTimingFunction: "linear",
    animationName: `${css.keyframes({
        "0%": {
            opacity: 0,
            transform: `translateX(5%)`,
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0%)",
        }
    })}`
});

export const PageCard = (page) => {

    const homeContext = useContext(HomeContext);
    const selected = homeContext.selectedPage?.id === page.id;

    const onSelect = () => { homeContext.setSelectedPage(page) };

    return (
        <Margin>
            <FadeIn style={{ animationDuration: `${random(500)}ms` }}>
                <Card>
                    <LeftContainer onClick={onSelect}>
                        <H2>{page.name}</H2>
                        <SelectButton>
                            {selected ?
                                uiText.pageList.card.selected :
                                uiText.pageList.card.unselected}
                        </SelectButton>
                    </LeftContainer>
                    <RightContainer>
                        <ToPage id={page.id} />
                        <ToQR id={page.id} />
                    </RightContainer>
                </Card>
            </FadeIn >
        </Margin>
    )
}