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
 * @returns [ page, setNext, reset ] -> [ 'current page', 'more data is available' 'update page to next page', 'reset to first page' ]
 * 
 * Adapted from [this file](https://github.com/olaven/exam-pg6101/blob/master/frontend/src/utils/PaginationFetcher.jsx)
 */
export const usePagination = function <T>(basePath: string): [
    PaginatedModel<T>,
    boolean,
    boolean,
    () => void,
    () => void] {

    const [next, setNext] = useState(basePath)
    const [page, setPage] = useState<PaginatedModel<T>>({
        data: [], next: null
    });
    const [moreAvailable, setMoreAvailable] = useState(true);

    const [isLoading, setIsLoading] = useState(true)

    const applyNext = (path: string) =>
        () => setNext(path);

    asyncEffect(async () => {
        setIsLoading(true)
        const page = await filterBody(
            get<PaginatedModel<T>>(next)
        );
        await new Promise(resolve => setTimeout(resolve, 2000)) //TODO: REMOVE
        setPage(page);
        setIsLoading(false)
        if (page.data.length === 0) {

            setMoreAvailable(false);
        }
    }, [next]);

    return [page, moreAvailable, isLoading, applyNext(page.next), applyNext(basePath)];
};