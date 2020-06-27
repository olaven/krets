import { useEffect, useState } from "react";
import { get } from "../http/methods";
import { PageModel } from "../models";
import { OK } from "../http/codes";

export const usePage = (id: string): [PageModel, boolean] => {

    const [page, setPage] = useState<PageModel>(null);
    const [loading, setLoading] = useState(true);

    const fetchPage = async () => {

        const [status, page] = await get<PageModel>(`/api/pages/${id}`);
        if (status === OK) {

            setPage(page);
            setLoading(false);

        } else {

            console.warn(`Getting ${status} when fetching page ${id}`);
            setPage(null);
        }

        setLoading(false);
    }
        ;

    useEffect(() => {

        setLoading(true);
        fetchPage();
    }, [id]);


    return [page, loading];
};