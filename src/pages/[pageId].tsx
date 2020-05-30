import { useRouter } from 'next/router'

const PageId = () => {

    const router = useRouter();
    const { pageId } = router.query;


    return <div>
        Brand page for {pageId}
    </div>
};

export default PageId;