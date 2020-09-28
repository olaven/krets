import { Text } from "rebass";
import { EmbeddableCreator } from "./EmbeddableCreator"
import * as text from "../../../text"
import { EmbeddableContext, EmbeddableContextProvider } from "../../../context/EmbeddableContext";
import { useContext } from "react";
import { SettingsContext } from "../../../context/SettingsContext";
import { EmbeddableSnippet } from "./EmbeddableSnippet";

const uiText = text.settings.embeddable

const EmbeddableContent = () => {

    const { embeddable } = useContext(EmbeddableContext);
    return embeddable ?
        <EmbeddableSnippet /> :
        <EmbeddableCreator />
}

export const ManageEmbeddable = () => {

    const { page } = useContext(SettingsContext);
    return <EmbeddableContextProvider pageId={page.id}>
        <EmbeddableContent />
    </ EmbeddableContextProvider >
}