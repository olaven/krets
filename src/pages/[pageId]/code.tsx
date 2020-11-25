import { useRouter } from "next/router";
import { usePage } from "../../effects/usePage";
import { extractCanvasURL } from "../../components/Code/extractCanvasURL";
import { ColumnContainer } from "../../components/standard/Containers";
import {Loader } from "../../components/standard/loader";
import { QRImage } from "../../components/Code/QRImage";
import { DownloadPoster } from "../../components/Code/DownloadPoster";
import { DownloadQR } from "../../components/Code/DownloadQR";
import { styled } from "../../stiches.config";


const Container = styled(ColumnContainer, {
    alignItems: "center",
});


export default () => {

    const pageId = useRouter().query.pageId as string;
    const getCanvasURL = extractCanvasURL(".qr-code > canvas")
    
    const [page, loading] = usePage(pageId as string);
    
    return (loading? 
    <Loader size={150}/>: 
    <Container>
        <QRImage page={page} />
        <ColumnContainer style={{marginTop: "$55"}}>
            <DownloadPoster page={page} getCanvasURL={getCanvasURL}/> 
            <DownloadQR page={page} getCanvasURL={getCanvasURL} />
        </ColumnContainer>
    </Container>)
}