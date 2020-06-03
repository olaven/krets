import {useEffect, useState} from "react";

export const usePage = (id: string) => {

    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPage = async () => {

            const response = await fetch(`/api/pages/${id}`);
            if (response.status === 200) {

                const page = await response.json();
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