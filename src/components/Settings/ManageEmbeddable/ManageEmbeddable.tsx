import { EmbeddableCreator } from "./EmbeddableCreator"
import { EmbeddableContext, EmbeddableContextProvider } from "../../../context/EmbeddableContext";
import { useContext } from "react";
import { HomeContext } from "../../../context/HomeContext";
import { EmbeddableSnippet } from "./EmbeddableSnippet";

//NOTE: exported to tests
export const EmbeddableContent = () => {

    const { embeddable } = useContext(EmbeddableContext);
    return embeddable ?
        <EmbeddableSnippet /> :
        <EmbeddableCreator />
}

export const ManageEmbeddable = () => {

    const { page } = useContext(HomeContext);
    return <EmbeddableContextProvider pageId={page.id}>
        <EmbeddableContent />
    </ EmbeddableContextProvider >
}