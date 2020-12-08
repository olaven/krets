import { styled } from "../../../stiches.config"
import { RowContainer, ColumnContainer } from "../../standard/Containers"
import { H2 } from "../../standard/Heading"
import { Paragraph } from "../../standard/Text"

const Container = styled(RowContainer, {
    border: "solid black 2px",
    borderRadius: "20px",
    width: "$21vw", 
    margin: "$21",
    padding: "$21"
});

const CompanyContainer = styled(ColumnContainer, {
    alignItems: 'center',
}); 

const QuoteContainer = styled(ColumnContainer, {

    justifyContent: "flex-end", 
    marginLeft: "$21",
    marginTop: "$21",
});

const Image = styled("img", {
    width: "114px"
});

const Quote = styled("span", {
    fontSize: "$13"
});

type Props = {
    companyName: string, 
    quote: string, 
    personName: string
    logoURL: string
}
export const Testemonial = ({ companyName, quote, personName, logoURL}: Props) => (
    <Container>
        <CompanyContainer>
            <Image src={logoURL}/>
        </CompanyContainer>
        <QuoteContainer>
            <h2>{companyName}</h2>
            <Paragraph ligth>
                "{quote}" 
                <br />
                <Quote>-{personName}</Quote>
            </Paragraph>
        </QuoteContainer>
    </Container>
)