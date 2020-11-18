import { NOT_FOUND, OK } from "node-kall";
import { createContext, ReactChild, ReactChildren, ReactElement, useState } from "react";
import { asyncEffect } from "../effects/asyncEffect";
import { getEmbeddable } from "../helpers/fetchers";
import { EmbeddableModel } from "../models/models";

interface IEmbeddableContext {
    embeddable: EmbeddableModel, refreshEmbeddables: () => Promise<void>
}

export const EmbeddableContext = createContext<IEmbeddableContext>({
    embeddable: null, refreshEmbeddables: async () => { }
});


export const EmbeddableContextProvider = ({ pageId, children }: { pageId: string, children: ReactElement | ReactElement[] }) => {

    const [embeddable, setEmbeddable] = useState<EmbeddableModel>(null);

    const refreshEmbeddables = async () => {

        const [status, embeddable] = await getEmbeddable(pageId);

        if (status === OK) {

            setEmbeddable(embeddable);
        } else if (status === NOT_FOUND) {

            setEmbeddable(null);
        } else {
            console.warn(`Received ${status} when fetching embeddable..`)
        }
    }

    asyncEffect(refreshEmbeddables, []);

    return <EmbeddableContext.Provider value={{ embeddable, refreshEmbeddables }}>
        {children}
    </EmbeddableContext.Provider>
};