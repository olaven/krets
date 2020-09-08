import { Heading, Card, Text, Box, Button } from "rebass";
import { Stripe } from "stripe";
import { usePrices } from "../../effects/usePrices";
import * as text from "../../text";


type PriceProps = { price: Stripe.Price, selectedPriceId: string, setSelectedPrice: any }
const PriceRepresentation = ({ price, selectedPriceId, setSelectedPrice }: PriceProps) => {

    const isSelected = selectedPriceId === price.id;
    const [firstTier, secondTier] = price.tiers;


    return <Box>
        {/* <Text>{price.nickname}</Text> */}
        <Text>{firstTier.flat_amount / 100},- {text.upgrade.included} {firstTier.up_to} {text.upgrade.pages}!</Text>
        <Text>{secondTier.unit_amount / 100},- {text.upgrade.afterTier}</Text>
        <Text>{text.upgrade.monthly}</Text>
        <Text>{text.upgrade.vat}</Text>
        <Button
            onClick={isSelected ? null : () => { setSelectedPrice(price.id) }}>
            {isSelected ? text.upgrade.priceChosen : text.upgrade.choosePrice}
        </Button>
    </Box>
}

type CardProps = { product: Stripe.Product, selectedPriceId: string, setSelectedPriceId: any }
export const ProductCard = ({ product, selectedPriceId, setSelectedPriceId }: CardProps) => {

    const prices = usePrices(product.id);
    return <Box p={[1, 2, 3]}>
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
