import { styled } from "../../stiches.config";

export const UpperLeftCorner = styled("div", {
    opacity: .2,
    fontSize: "1.25em",
    positon: "absolute", 
    left: "$5",
    top: "$5", 
    ":hover": {
        opacity: 1,
        transition: "ease 100ms",
        cursor: "pointer", 
        transformOrigin: "center",
    },
});    

export const Modal = styled("div", {
    display: "none", 
    opacity: 0, 
    transition: "ease 300ms",

    position: "fixed",
    border: "solid 1px", 
    borderRadius: "15px",

    backgroundColor: "$secondary",

    top: "50vh",
    left: "50vw", 
    transform: "translateY(-50%) translateX(-50%)",
    width: "34vw", 
    height: "55vh", 

    padding: "$21", 

    variants: {
        visible: {
            true: {
                display: "block",
                opacity: 1
            }
        }
    },
    
    small: {
        top: "0",
        left: "0", 
        width: "100vw", 
        height: "100vh", 
        transform: "translateY(0)",
        marginTop: "$21", 
        marginBottom: "$5", 
    },
});