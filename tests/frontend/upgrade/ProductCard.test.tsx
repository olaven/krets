/**
 * @jest-environment jsdom
 */

import * as faker from "faker";
import { waitFor, fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { ProductCard } from "../../../src/components/Upgrade/ProductCard";
import Stripe from "stripe";
import { uid } from "../../api/apiTestUtils";
import { mockFetch, mockPrice, mockProduct } from "../frontendTestUtils";


//jest.mock("../../src/payment/stripe");

describe("The product card component", () => {

    const launch = (product: Stripe.Product, selectedPriceId: string = uid(), setSelectedPriceId = () => { }) =>
        render(<ProductCard product={product} selectedPriceId={selectedPriceId} setSelectedPriceId={setSelectedPriceId} />);

    it("Does render", async () => {

        const priceId = uid()
        mockFetch([
            mockPrice(priceId)
        ]);

        const productName = faker.commerce.productName();
        const { getByText } = launch(mockProduct(productName), priceId);

        expect(getByText(productName)).toBeInTheDocument();
    });
});