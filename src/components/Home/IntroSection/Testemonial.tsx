import { styled } from "../../../stiches.config"
import { RowContainer, ColumnContainer } from "../../standard/Containers"
import { Paragraph } from "../../standard/Text"

const Container = styled(ColumnContainer, {
    width: "44vw",
    justifyContent: "space-evenly",
    border: "solid black .5px",
    borderRadius: "20px",
    margin: "$21",
    padding: "$5",
    //padding: "$21", 
});

const CompanyContainer = styled(ColumnContainer, {
    marginTop: "$21",
    alignItems: 'center',
}); 

const QuoteContainer = styled(ColumnContainer, {

    justifyContent: "flex-end", 
    marginLeft: "$21",
    marginTop: "$21",
});

const Image = styled("img", {
    height: "79px"
});

const Quote = styled("span", {
    fontSize: "$13"
});



export interface ITestemonial {
    companyName: string, 
    quote: string, 
    personName: string
    logoURL: string
}

export const Testemonial = ({ companyName, quote, personName, logoURL}: ITestemonial) => (
    <Container>
        <CompanyContainer>
            <Image src={logoURL}/>
            {/* <h2>{companyName}</h2>  */}
        </CompanyContainer>
        <QuoteContainer>
            <Paragraph ligth>
                "{quote}" 
                <br />
                <Quote>- {personName}</Quote>
            </Paragraph>
        </QuoteContainer>
    </Container>
)