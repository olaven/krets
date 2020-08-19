import { useEffect, useState } from "react";
import { PageModel } from "../models/models";
import { usePagination } from "../effects/usePagination";

type ReturnType = [
    pages: PageModel[],
    getNextPages: () => void,
    resetPages: () => void
]

/**
 * Essentially a Wrapper for `usePagination`, keeping 
 * old paged data in a buffer. 
 * 
 * THINKABOUT: use this or context? 
 */
export const usePages = (): ReturnType => {

    const [page, getNextPages, resetPages] = usePagination<PageModel>(`/api/pages`);

    //A buffer keeping old `.data`
    const [pages, setPages] = useState<PageModel[]>([]);

    useEffect(() => {

        setPages([...pages, ...page.data])
    }, [page.next]);

    return [
        pages, getNextPages, resetPages
    ]
};

