import { useEffect, useState } from "react";
import { PageModel } from "../models/models";
import { OK } from "node-kall";
import { getPage } from "../helpers/fetchers";

export const usePage = (id: string): [PageModel, boolean, (() => Promise<any>),] => {

    const [page, setPage] = useState<PageModel>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setLoading(true);
        updatePage();
    }, [id]);

    useEffect(() => {
        //NOTE: toggling `loading` when `page` changes.

        if (page) {
            setLoading(false);
        }
    }, [page]);

    const updatePage = async () => {

        const [status, page] = await getPage(id);
        if (status === OK) {

            setPage(page);
        } else {

            console.warn(`Getting ${status} when fetching page ${id}`);
            setPage(null);
        }
    };


    return [page, loading, updatePage];
};