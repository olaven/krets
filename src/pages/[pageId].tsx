import { useRouter } from 'next/router'
import React, { useContext } from "react";
import { ErrorLoadingPage } from "../components/Page/ErrorLoadingPage";
import { LoadingPage } from "../components/Page/LoadingPage";
import { ResponseSection } from "../components/Page/ResponseSection";
import { Flex, Box } from "rebass";
import { usePage } from "../effects/usePage";
import { UserContext } from '../context/UserContext';
import { CopyURLButton } from '../components/Page/CopyURLButton';

export default () => {

    const { user } = useContext(UserContext);

    const router = useRouter();
    const pageId = router.query.pageId as string;

    const [page, loading] = usePage(pageId);
    const userOwnsThePage = user && user.sub === page.owner_id;

    return <Box>
        <Flex>
            {loading ?
                <LoadingPage /> :
                page ?
                    <ResponseSection page={page} /> :
                    <ErrorLoadingPage />
            }
        </Flex>
        {userOwnsThePage && <CopyURLButton />}
    </Box>
};

