import {useEffect, useState} from "react";

export const usePage = (id: string) => {

    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPage = async () => {

            const response = await fetch(`/api/pages/${id}`);
            if (id === "guros-kafe"/*response.status === 200*/) {

                /*const page = await response.json();
                setPage(page);*/
                //TODO: add code bac when server works.


                setPage({
                    id: "guros-kafe",
                    name: "Guros Kafe!",
                    owner: {
                        id: "google-oauth2|103130415679943370506" //NOTE: id of my test account
                    },
                    responses: [],
                });
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