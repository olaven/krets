import { Testemonial, ITestemonial} from "./Testemonial";
import { styled } from "../../../stiches.config";
import { RowContainer } from "../../standard/Containers";

const Container = styled(RowContainer, {
    justifyItems: "baseline", 
    small: {
        flexWrap: "wrap"
    }
}); 

export const Testemonials = ({ testemonials }: { testemonials: ITestemonial[]}) => 
    <Container>
        {testemonials.map(testemonial => 
            <Testemonial {...testemonial} />
        )}
    </Container>