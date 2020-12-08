import { styled } from "../../../stiches.config"
import { RowContainer } from "../../standard/Containers"
import { H3 } from "../../standard/Heading"

const Container = styled(RowContainer, {

});

type Props = {
    companyName: string, 
    quote: string, 
    personName: string
    logoURL: string
}
export const Testemonial = ({ companyName, quote, personName, logoURL}: Props) => (
    <Container>
        HER ER DET NOE
        <H3>{companyName}</H3>
    </Container>
)