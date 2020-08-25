import * as NextLink from 'next/link'
import { Heading, Text, Flex, Box, Button, Link } from "rebass";
import { useContext, useState } from "react";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { ProductCard } from "../components/Upgrade/ProductCard";
import * as text from "../text"
import { UserContext } from "../context/UserContext";

const PriceAlternatives = () => {

    const [selectedPriceId, setSelectedPriceId] = useState("");
    const products = useProducts();

    return <>
        <Heading fontSize={[3, 4, 5]} textAlign="center">{text.upgrade.heading}</Heading>
        <Text fontSize={[1, 2, 3]} textAlign="center">{text.upgrade.inDevelopmentWarning}</Text>
        <Flex p={[2, 3, 4]}>
            {products.map(product => <ProductCard
                product={product}
                selectedPriceId={selectedPriceId}
                setSelectedPriceId={setSelectedPriceId} />
            )}
        </Flex>
        <Flex width={1} m={[2, 3, 4]}>
            <Box width={[0, 1 / 3]} />
            <Box width={1}>
                {selectedPriceId &&
                    <PaymentCard priceId={selectedPriceId} />}
            </Box>
            <Box width={[0, 1 / 3]} />
        </Flex>
    </>
}

const Thanks = () => {

    const { databaseUser, authUser } = useContext(UserContext);

    const onCancel = async () => {


    }

    console.log("nextlink: ", NextLink.default)
    const TextBox = ({ children }) => <Text fontSize={[2, 3, 4]} my={[1, 2, 3]}>
        {children}
    </Text>

    return <Flex>
        <Box width={[0, 1 / 3]} />
        <Box>
            <Heading as="h1">Tusen takk, {authUser.name.split(" ")[0]} 🙌</Heading>
            <TextBox>Du har dette abbonnemenetet: <span style={{
                borderColor: "teal",
                borderStyle: "solid",
                padding: "5px"
            }}>grunder</span> </TextBox>
            <TextBox>
                Tilbakemeldinger er det eneste som muliggjør forbedring 👊
            </TextBox>
            <TextBox>
                Krets er et lite og uavhengig selskap som ønsker å gjøre tilbakemelding så enkelt som mulig, for så mange som mulig.
            </TextBox>
            <TextBox>
                Ta kontakt på <Link href={"mailto:post@krets.app"}>post@krets.app</Link>👋
            </TextBox>
            <TextBox>
                - <Link href="https://olaven.org">Olav</Link> - daglig leder, utvikler, 👨‍💻 og alt annet.
            </TextBox>

            <Button width={[1, 0.5]} backgroundColor="primary" m={[1]}>
                <NextLink.default href={"/"} prefetch={true}>
                    <a style={{ textDecoration: "none" }}>
                        <Text color="secondary">Tilbake til Krets</Text>
                    </a>
                </NextLink.default>
            </Button>
            <Button width={[1, 0.5]} onClick={onCancel} backgroundColor="failure" m={[1]}>
                <Text>Kanseller</Text>
            </Button>
        </Box>
        <Box width={[0, 1 / 3]} />
    </Flex >
}

const Upgrade = () => {

    const { databaseUser } = useContext(UserContext);

    const isSubscriber = databaseUser?.free_premium || databaseUser?.subscription_id
    return isSubscriber ?
        <Thanks /> :
        <PriceAlternatives />
}

export default Upgrade; 