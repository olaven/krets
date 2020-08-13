import { Heading, Card, Text, Flex, Box, Button } from "rebass";
import { Stripe } from "stripe";
import { usePrices } from "../../effects/usePrices";


const PriceRepresentation = ({ price, selectedPriceId, setSelectedPrice }) => {

    const isSelected = selectedPriceId === price.id;

    return <>
        <Text>{price.nickname}</Text>
        <Button
            onClick={isSelected ? null : () => { setSelectedPrice(price.id) }}>
            {isSelected ? "Valgt" : "Velg pris"}
        </Button>
    </>
}

type CardProps = { product: Stripe.Product, selectedPriceId: string, setSelectedPriceId: any }
export const ProductCard = ({ product, selectedPriceId, setSelectedPriceId }: CardProps) => {

    const prices = usePrices(product.id);
    return <Box width={[1 / 2]}>
        <Card>
            <Heading fontSize={[2, 3, 4]}>{product.name}</Heading>
            <Text fontSize={[1, 2, 3]}>{product.description}</Text>
            {prices.map(price => <PriceRepresentation
                price={price}
                selectedPriceId={selectedPriceId}
                setSelectedPrice={setSelectedPriceId}
            />)}
        </Card>
    </Box>

}
