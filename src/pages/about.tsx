import * as uiText from "../text";
import { Box, Flex, Heading, Image, Link } from "rebass";
import { TextBox } from "../components/tiny/TextBox";

const About = () => <Box px={[0, "20%"]}>

    <Heading fontSize={[5, 6, 7]} textAlign="center">{uiText.about.heading}</Heading>
    <TextBox>{uiText.about.first}</TextBox>
    <TextBox>{uiText.about.second}</TextBox>
    <TextBox>{uiText.about.third}</TextBox>
    <TextBox>{uiText.about.fourth}</TextBox>
    <TextBox>- <Link href="https://olaven.org">Olav</Link>{uiText.about.greetings}</TextBox>
    <Flex>
        <Box py={[1, 2]}>
            <Heading textAlign="center" fontSize={[3, 4, 5]}>{uiText.about.badAlternative}</Heading>
            <Image src={"/form.svg"} width={1 / 2} />
        </Box>
        <Box py={[1, 2]}>
            <Heading textAlign="center" fontSize={[3, 4, 5]}>{uiText.about.goodAlternative}</Heading>
            <Image src={"/feedback-only-smileys.svg"} />
        </Box>
    </Flex>
</Box>

export default About; 