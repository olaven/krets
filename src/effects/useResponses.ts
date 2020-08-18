import { useState, useEffect } from "react"
import { ResponseModel } from "../models/models"
import { OK } from "node-kall";
import { getResponses } from "../fetchers";


//NOTE: Response fetching in this file is a common pattern. Should have common, fitting abstraction

export const useResponses = (pageId: string): [ResponseModel[], boolean] => {

    const [responses, setResponses] = useState<ResponseModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {

            const [status, responsePage] = await getResponses(pageId)
            if (status === OK) {

                //console.log("Fetched responses", responsePage.data);
                setResponses(responsePage.data);
            } else {

                console.warn(`received ${status} when fetching responses for ${pageId}`);
                setResponses(null);
            }

            setLoading(false);
        })()
    }, [pageId])

    return [responses, loading];
}