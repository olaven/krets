import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import {ErrorLoadingPage} from "../components/Page/ErrorLoadingPage";
import {LoadingPage} from "../components/Page/LoadingPage";
import {ResponseSection} from "../components/Page/ResponseSection";
import {Flex} from "rebass";
import {usePage} from "../effects/usePage";

const PageId = () => {

    const router = useRouter();
    const pageId = router.query.pageId as string;

    const [page, loading] = usePage(pageId);


    return <Flex>
        {loading?
            <LoadingPage/>:
            page?
                <ResponseSection page={page}/>:
                <ErrorLoadingPage/>
        }
    </Flex>
};

export default PageId;