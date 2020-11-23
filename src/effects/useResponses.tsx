import { useState, useEffect } from "react";
import { ResponseModel } from "../models/models"
import { usePagination } from "./usePagination";


/**
 * Forwards `usePagination` + Keeps old responses in a local 'buffer'
 */
export const useResponses = (pageId: string): [ResponseModel[], boolean, boolean, () => void] => {

    const [page, moreAvailable, responsesLoading, getNext] = usePagination<ResponseModel>(`/api/pages/${pageId}/responses`, 10);

    //A buffer keeping old `.data`
    const [responses, setResponses] = useState<ResponseModel[]>([]);

    useEffect(() => {

        setResponses([...responses, ...page.data])
    }, [page.next]);

    return [responses, moreAvailable, responsesLoading, getNext];
}
