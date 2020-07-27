import { useState, useEffect } from "react"
import { ReseponseModel } from "../models"
import { OK } from "node-kall";
import { getResponses } from "../http/fetchers";


//NOTE: Response fetching in this file is a common pattern. Should have common, fitting abstraction

export const useResponses = (pageId: string): [ReseponseModel[], boolean] => {

    const [responses, setResponses] = useState<ReseponseModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {

            const [status, responses] = await getResponses(pageId)
            if (status === OK) {

                setResponses(responses);
            } else {

                console.warn(`received ${status} when fetching responses for ${pageId}`);
                setResponses(null);
            }

            setLoading(false);
        })()
    }, [pageId])

    return [responses, loading];
}