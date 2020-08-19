import { useState } from "react";
import { get, filterBody } from "node-kall"
import { asyncEffect } from "./asyncEffect";
import { PaginatedModel } from "../models/models";

/**
 * A utility effect 
 * for handling paginated endpoinds 
 * returning `PaginatedModel<T>`
 * 
 * @param basePath The initial path of the endpoint 
 * @returns [ page, setNext, reset ] -> [ 'current page', 'update page to next page', 'reset to first page' ]
 * 
 * Adapted from [this file](https://github.com/olaven/exam-pg6101/blob/master/frontend/src/utils/PaginationFetcher.jsx)
 */
export const usePagination = function <T>(basePath: string): [page: PaginatedModel<T>, getNext: () => void, reset: () => void] {

    const [next, setNext] = useState(basePath)
    const [page, setPage] = useState<PaginatedModel<T>>({
        data: [], next: null
    });

    const applyNext = (path: string) =>
        () => setNext(path);

    asyncEffect(async () => {

        const page = await filterBody(
            get<PaginatedModel<T>>(next)
        );
        setPage(page);
    }, [next]);

    return [page, applyNext(page.next), applyNext(basePath)];
};