import {useEffect, useState} from "react";
import { get } from "../http/methods";
import { PageModel } from "../models";

export const usePage = (id: string) => {

    const [page, setPage] = useState<PageModel>(null);
    const [loading, setLoading] = useState(true);

    const fetchPage = async () => {

            const [status, page]= await get<PageModel>(`/api/pages/${id}`);
            if (status === 200) {

                setPage(page);
                setLoading(false);

            } else {

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