import { Box, Flex, Heading } from "rebass";
import { Collapsible } from "../components/Collapsible";
import { AdminVideo, GetStartedVideo, ShareVideo } from "../components/Videos";

const Guide = () => <Flex>
    <Box width={[0, 1 / 3]} />
    <Box>

        {/* TODO: add to header navigation */}
        {/* TODO: Localize text */}
        {/* //TODO: swap for wistia.com (post@krets.app account)
        //TODO: add the other videos as well */}
        <Heading>Videoer:</Heading>
        <Collapsible text={"Hvordan kommer jeg i gang?"}>
            <GetStartedVideo />
        </Collapsible>
        <Collapsible text="Hvordan deler jeg med mitt publikum?">
            <ShareVideo />
        </Collapsible>
        <Collapsible text="Hvordan ser jeg resultatene?">
            <AdminVideo />
        </Collapsible>
    </Box>
    <Box width={[0, 1 / 3]} />
</Flex >

export default Guide; 