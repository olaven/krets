import { useRouter } from 'next/router'
import { Box, Flex } from "rebass";
import { ErrorLoadingPage } from '../../components/Page/ErrorLoadingPage';
import { ResponseSection } from '../../components/Page/ReseponseSection/ResponseSection';
import { Loader } from '../../components/tiny/loader';
import { QuestionsContextProvider } from '../../context/QuestionsContext';
import { usePage } from '../../effects/usePage';


const Embed = () => {

    const router = useRouter();
    //NOTE: Token passed as router query 
    const { pageId, token } = router.query

    const [page, loading] = usePage(pageId as string);

    console.log("token here: ", token);

    return <Box>
        <Flex>
            {
                loading ?
                    <Loader size={150} /> :
                    page ?
                        <QuestionsContextProvider pageId={page.id}>
                            <ResponseSection page={page} showHeader={false} />
                        </QuestionsContextProvider> :
                        <ErrorLoadingPage />
            }
        </Flex>
    </Box>
}

export default Embed;