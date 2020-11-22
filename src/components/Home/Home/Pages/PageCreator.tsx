import React, { useContext, useEffect, useState } from "react";
import { PagesContext } from "../../../../context/PagesContext";
import { post, CREATED, CONFLICT } from "node-kall";
import * as text from "../../../../helpers/text"
import { PageModel } from "../../../../models/models";
import { CreatorInput } from "./CreatorInput";
import { CreatorButton } from "./CreatorButton";

export const nameToId = (name: string) => name
    .toLowerCase()
    .replace(/(Ø|ø)/g, "oe")
    .replace(/(Æ|æ)/g, "ae")
    .replace(/(Å|å)/g, "aa")
    .replace("?", "")
    .replace("!", "")
    .replace(/[^a-zA-Z0-9s|]/g, "-");


export const PageCreator = () => {

    const { addPage } = useContext(PagesContext);


    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");


    useEffect(() => {

        setId(nameToId(name))
    }, [name]);


    //TODO: this function should not be part of UI logic 
    const postPage = async () => {

        const [status, page] = await post(`/api/pages`, {
            id, name
        });

        if (status === CREATED) {

            setName("");
            addPage(page as PageModel); //NOTE: missing .owner_id, but that is added in backend
        } else if (status === CONFLICT) {

            alert(text.pageCreator.conflict);
        }
        else {

            alert(text.pageCreator.error);
            console.error("Error posting page: ", status);
        }
    };

    
    return true /* visible */ ?
        <CreatorInput /> :
        <CreatorButton
            onClick={() => { setVisible(true) }}>
            Lag ny side
        </CreatorButton>;
}; 
