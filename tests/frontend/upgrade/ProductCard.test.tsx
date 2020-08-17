/**
 * @jest-environment jsdom
 */

import * as faker from "faker";
import Stripe from "stripe";
import { waitFor, fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { ProductCard } from "../../../src/components/Upgrade/ProductCard";
import * as text from "../../../src/text";
import { uid } from "../../api/apiTestUtils";
import { mockFetch, mockPrice, mockProduct, mockTier } from "../frontendTestUtils";


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

    it("Displays the price alternatives", async () => {


        const [firstTier, secondTier] = [mockTier(faker.random.number()), mockTier(faker.random.number())];
        mockFetch([mockPrice("id", [firstTier, secondTier])]);

        const { getByText } = launch(mockProduct());
        waitFor(() => {
            expect(getByText(firstTier.flat_amount.toString())).toBeInTheDocument();
            expect(getByText(secondTier.flat_amount.toString())).toBeInTheDocument();
        });
    });

    it("Displays price tier limit", () => {

        const [firstTier, secondTier] = [mockTier(-1, faker.random.number()), mockTier(-1, faker.random.number())];
        mockFetch([mockPrice("id", [firstTier, secondTier])]);

        const { getByText } = launch(mockProduct());
        waitFor(() => {
            expect(getByText(firstTier.up_to.toString())).toBeInTheDocument();
            expect(getByText(secondTier.up_to.toString())).toBeInTheDocument();
        });
    });

    it("Shows appropriate text if not selected", () => {

        const priceId = uid();
        const otherPrice = uid();
        mockFetch([mockProduct(priceId)]);


        const { getByText } = launch(mockProduct(), otherPrice);
        waitFor(() => {
            expect(getByText(text.upgrade.choosePrice)).toBeInTheDocument();
        });
    });

    it("Shows appropriate text if selected", () => {

        const priceId = uid();
        mockFetch([mockProduct(priceId)]);


        const { getByText } = launch(mockProduct(), priceId);

        waitFor(() => {
            expect(getByText(text.upgrade.priceChosen)).toBeInTheDocument();
        });
    });
});