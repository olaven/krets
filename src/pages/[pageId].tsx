import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import {ErrorLoadingPage} from "../components/Page/ErrorLoadingPage";
import {LoadingPage} from "../components/Page/LoadingPage";
import {FeedbackSection} from "../components/Page/FeedbackSection";
import {Flex} from "rebass";


const usePage = (id: string) => {

    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPage = async () => {

            const response = await fetch(`/api/pages/${id}`);
            if (id === "guros-kafe"/*response.status === 200*/) {

                /*const page = await response.json();
                setPage(page);*/
                //TODO: add code bac when server works.


                setPage({
                    id: "Guros Kafe!",
                    name: "guros-kafe",
                    owner: {
                        id: "someid"
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

const PageId = () => {

    const router = useRouter();
    const {pageId} = router.query;

    const [page, loading] = usePage(pageId);


    return <Flex>
        {loading?
            <LoadingPage/>:
            page?
                <FeedbackSection page={page}/>:
                <ErrorLoadingPage/>
        }
    </Flex>
};

export default PageId;