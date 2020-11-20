import { Box, Flex, Heading } from "rebass";
import * as uiText from "../helpers/text"
import { Collapsible } from "../components/Collapsible";
import { AdminVideo, GetStartedVideo, ShareVideo } from "../components/Videos";

const Guide = () => <Flex>
    <Box width={[0, 1 / 3]} />
    <Box>

        {/* TODO: swap for wistia.com (post@krets.app account) */}
        <Heading fontSize={[5, 6, 7]}>Videoer:</Heading>
        <Collapsible text={uiText.guide.toGetStartedVideo}>
            <GetStartedVideo />
        </Collapsible>
        <Collapsible text={uiText.guide.toShareVideo}>
            <ShareVideo />
        </Collapsible>
        <Collapsible text={uiText.guide.toAdminVideo}>
            <AdminVideo />
        </Collapsible>
    </Box>
    <Box width={[0, 1 / 3]} />
</Flex >

export default Guide; 