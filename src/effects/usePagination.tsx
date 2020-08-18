import { useState } from "react";
import { get, OK } from "node-kall"
import { asyncEffect } from "./asyncEffect";
import { PaginatedModel } from "../models/models";

/**
 * A utility effect 
 * for handling paginated endpoinds 
 * returning `PaginatedModel<T>`
 * 
 * @param basePath The initial path of the endpoint 
 * @returns [ page, setNext ] -> [ 'current page', 'link to next page' ]
 * 
 * Adapted from [this file](https://github.com/olaven/exam-pg6101/blob/master/frontend/src/utils/PaginationFetcher.jsx)
 */
export const usePagination = function <T>(basePath: string): [PaginatedModel<T>, () => void] {

    const defaultPage = {
        data: [], next: null
    }

    const [next, setNext] = useState(basePath)
    const [page, setPage] = useState<PaginatedModel<T>>(defaultPage);

    asyncEffect(async () => {

        const [status, page] = await get<PaginatedModel<T>>(next);
        setPage(status === OK ?
            page :
            defaultPage)
    }, [next]);

    const getNext = () => {

        setNext(page.next);
    }

    return [page, getNext];
};