import { useContext } from "react";
import { AdminPageContext } from "../../../context/AdminPageContext";
import { TextCard } from "./TextCard"


export const TextCards = ({ selectedEmotions }) => {

    const { responses } = useContext(AdminPageContext);

    return <>
        {responses
            .filter(({ emotion }) => selectedEmotions.includes(emotion))
            .map(response => <TextCard
                key={response.id}
                response={response}
            />)}
    </>
}