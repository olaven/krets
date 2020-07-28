import { useRouter } from 'next/router'
import React from "react";
import { ErrorLoadingPage } from "../components/Page/ErrorLoadingPage";
import { LoadingPage } from "../components/Page/LoadingPage";
import { ResponseSection } from "../components/Page/ResponseSection";
import { Flex } from "rebass";
import { usePage } from "../effects/usePage";

export default () => {

    const router = useRouter();
    const pageId = router.query.pageId as string;

    const [page, loading] = usePage(pageId);


    return <Flex>
        {loading ?
            <LoadingPage /> :
            page ?
                <ResponseSection page={page} /> :
                <ErrorLoadingPage />
        }
    </Flex>
};

