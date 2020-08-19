import { useState, useEffect } from "react";
import { ResponseModel } from "../models/models"
import { usePagination } from "./usePagination";


/**
 * Forwards `usePagination` + Keeps old responses in a local 'buffer'
 */
export const useResponses = (pageId: string): [ResponseModel[], boolean, () => void] => {

    const [page, moreAvailable, getNext] = usePagination<ResponseModel>(`/api/pages/${pageId}/responses`);

    //A buffer keeping old `.data`
    const [responses, setResponses] = useState<ResponseModel[]>([]);

    useEffect(() => {

        setResponses([...responses, ...page.data])
    }, [page.next]);

    return [responses, moreAvailable, getNext];
}
