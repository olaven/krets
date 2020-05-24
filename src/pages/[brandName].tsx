import { useRouter } from 'next/router'

const Brand = () => {

    const router = useRouter()
    const { brandName } = router.query


    return <div>
        Brand page for {brandName}
    </div>
}

export default Brand;