import { useRouter } from 'next/router'
import React, { useContext } from "react";
import { ErrorLoadingPage } from "../components/Page/ErrorLoadingPage";
import { ResponseSection } from "../components/Page/ResponseSection";
import { Flex, Box } from "rebass";
import { usePage } from "../effects/usePage";
import { UserContext } from '../context/UserContext';
import { CopyURLButton } from '../components/Page/CopyURLButton';
import { Loader } from '../components/tiny/loader';

export default () => {

    const { authUser } = useContext(UserContext);

    const router = useRouter();
    const pageId = router.query.pageId as string;

    const [page, loading] = usePage(pageId);
    const userOwnsThePage = authUser && authUser.sub === page.owner_id;

    return <Box>
        <Flex>
            {loading ?
                <Loader size={150} /> :
                page ?
                    <ResponseSection page={page} /> :
                    <ErrorLoadingPage />
            }
        </Flex>
        {userOwnsThePage && <CopyURLButton />}
    </Box>
};

