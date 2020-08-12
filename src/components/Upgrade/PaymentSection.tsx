import { useContext } from "react"
import { StripeContextProvider, StripeContext } from "../../context/StripeContext"
import { PaymentCard } from "./PaymentCard";

export default () => {

    const { products } = useContext(StripeContext);

    console.log("products", products)
    return <>
        <PaymentCard priceId={"price_1HDYIqIDSMRX0WhP3nTJKOGI"} />
    </>
} 