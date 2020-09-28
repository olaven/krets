import { createContext } from "react";
import { asyncEffect } from "../effects/asyncEffect";
import { EmbeddableModel } from "../models/models";

interface IEmbeddableContext {
    embeddable: EmbeddableModel, refreshEmbeddables: () => Promise<void>
}

export const EmbeddableContext = createContext<IEmbeddableContext>({
    embeddable: null, refreshEmbeddables: async () => { }
});


export const EmbeddableContextProvider = props => {

    const [embeddable, setEmbeddable] = useState(null);

    asyncEffect(async () => {


    }, []);

    return <EmbeddableContext.Provider value={{}}>
        {props.children}
    </EmbeddableContext.Provider>
};