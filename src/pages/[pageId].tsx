import { useRouter } from 'next/router'
import React, { useContext, useState } from "react";
import { ErrorLoadingPage } from "../components/Page/ErrorLoadingPage";
import { ResponseSection } from "../components/Page/ReseponseSection/ResponseSection";
import { Flex, Box } from "rebass";
import { usePage } from "../effects/usePage";
import { UserContext } from '../context/UserContext';
import { CopyURLButton } from '../components/Page/CopyURLButton';
import { Loader } from '../components/tiny/loader';
import { QuestionsContextProvider } from '../context/QuestionsContext';
import { styled } from '../stiches.config';
import { emojidata } from '../emojidata';

const Container = styled('div', {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    justifyItems: 'center'
});

const Emoji = styled('div', {

    transitionDuration: "20ms",
    transitionTimingFunction: 'ease-in',

    ':hover': {
        transform: 'scale(120%)'
    },

    large: {
        fontSize: "8em",
    },

    small: {
        fontSize: "3em"
    },

    variants: {
        selected: {
            no: {
                display: 'none'
            },
            yes: {
                transform: 'scale(120%)'
            },
            unknown: {}
        },
    }
});

export default () => {

    const { authUser } = useContext(UserContext);

    const router = useRouter();
    const pageId = router.query.pageId as string;

    const [page, loading] = usePage(pageId);
    const userOwnsThePage = authUser && authUser.sub === page?.owner_id;

    //FIXME: move and integrate to `<ResponseSection/>`
    const [selected, setSelected] = useState(null);

    return <Container>
        <Emoji selected={selected ? selected === ':-)' ? 'yes' : 'no' : 'unknown'} onClick={() => setSelected(":-)")}>{emojidata[":-)"]}</Emoji>
        <Emoji selected={selected ? selected === ':-|' ? 'yes' : 'no' : 'unknown'} onClick={() => setSelected(":-|")}>{emojidata[":-|"]}</Emoji>
        <Emoji selected={selected ? selected === ':-(' ? 'yes' : 'no' : 'unknown'} onClick={() => setSelected(":-(")}>{emojidata[":-("]}</Emoji>
    </Container>
    //FIXME: temprarily removed to focus on stiches only
    /* return <>
        <Flex>
            {loading ?
                <Loader size={150} /> :
                page ?
                    <QuestionsContextProvider pageId={page.id} includeArchived={false}>
                        <ResponseSection page={page} showHeader={true} embeddable={{
                            active: false
                        }} />
                    </QuestionsContextProvider> :
                    <ErrorLoadingPage />
            }
        </Flex>
        {userOwnsThePage && <CopyURLButton />}
    </> */
};

