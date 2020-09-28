import { Text } from "rebass";
import { EmbeddableCreator } from "./EmbeddableCreator"
import * as text from "../../../text"

const uiText = text.settings.embeddable



export const ManageEmbeddable = () => <>
    <Text>{uiText.info}</Text>
    <EmbeddableCreator />
</>