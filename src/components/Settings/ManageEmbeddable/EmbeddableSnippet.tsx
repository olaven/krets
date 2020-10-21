import { useContext } from "react";
import { CopyBlock, github } from "react-code-blocks";
import { Text } from "rebass";
import { EmbeddableContext } from "../../../context/EmbeddableContext";
import { styled } from "../../../stiches.config";
import * as text from "../../../text";

const Container = styled("div", {
    display: "flex",
    flexDirection: "column"
});

export const EmbeddableSnippet = () => {

    const { embeddable } = useContext(EmbeddableContext);

    return <Container>
        <Text>{text.settings.embeddable.copyInstructions}</Text>
        <CopyBlock
            text={`
             <div>
                 <div id="krets-embeddable"></div>
                 <link rel="stylesheet" property="stylesheet" href="https://krets.app/embed/style.css">
                 <script src="https://krets.app/embed/script.js"></script>
                 <script>
                     IntializeKrets("${embeddable.page_id}", "${embeddable.token}");
                 </script>
             </div>    
             `}
            theme={github}
            language="markup" />
    </Container >
}

