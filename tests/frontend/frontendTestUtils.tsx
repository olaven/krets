import * as faker from "faker";
import * as nextRouter from 'next/router';
import { ReactElement } from 'react';
import { PageModel } from '../../src/models/models';
import { PagesContext } from "../../src/context/PagesContext";
import { render } from '@testing-library/react';
import { HomeTooltipProvider } from '../../src/components/Home/Home/HomeTooltipProvider';
import Stripe from "stripe";
import { UserContext } from "../../src/context/UserContext";
import { SettingsContext } from "../../src/context/SettingsContext";
import { randomPage } from "../api/apiTestUtils";


export const renderWithPagesContext = (
    Component: ReactElement,
    pages: PageModel[] = [],
    subscription_id = faker.random.uuid()
) => render(<PagesContext.Provider
    value={{
        pages,
        hasLoaded: false,
        pageLoading: false,
        moreAvailable: true,
        getNextPages: jest.fn(() => { }),
        addPage: jest.fn((page) => { })
    }}>
    <UserContext.Provider
        value={{
            //@ts-expect-error -> NOTE: not passing more context than what is needed. Typechecker should complain about this 
            databaseUser: { subscription_id }
        }}>

        <HomeTooltipProvider pageCount={0}>
            {Component}
        </HomeTooltipProvider>
    </UserContext.Provider>
</PagesContext.Provider>);

/**
 * NOTE: stolen from `embed-log`-branch. 
 * May cause merge conflict later. 
 * changes: passing `page` as an argument
 */
export const renderWithSettingsContext = (
    Component: ReactElement,
    page = randomPage("mock-render-owner"),
    updatePage = async () => { }
) => render(<SettingsContext.Provider value={{
    page,
    updatePage,
    pageLoading: false,
}}>
    {Component}
</SettingsContext.Provider>)



export const mockRouter = (pageId: string) => {
    //@ts-ignore
    nextRouter.useRouter = jest.fn();
    //@ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({
        query: { pageId }
    }));
}

export const mockFetch = <T extends unknown>(payload: T, status = 200) => {

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status,
            headers: {
                get: (_: string) => {
                    return "application/json"
                }
            },
            json: () => Promise.resolve(payload)
        } as Response);
    });
}


export const mockTier = (flat_amount = -1, up_to = -1, unit_amount = -1): Stripe.Price.Tier => ({
    flat_amount,
    up_to,
    unit_amount,
    flat_amount_decimal: flat_amount.toString(),
    unit_amount_decimal: unit_amount.toString(),
})

export const mockPrice = (id: string, tiers = [mockTier(), mockTier()]): Stripe.Price => ({

    id,
    tiers: tiers,

    /**
     * String representing the object's type. Objects of the same type share the same value.
     */
    object: 'price',

    /**
     * Whether the price can be used for new purchases.
     */
    active: true,

    /**
     * Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.
     */
    billing_scheme: "tiered",

    /**
     * Time at which the object was created. Measured in seconds since the Unix epoch.
     */
    created: 399,

    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
     */
    currency: "nok",

    deleted: undefined,

    /**
     * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
     */
    livemode: false,

    /**
     * A lookup key used to retrieve prices dynamically from a static string.
     */
    lookup_key: "string | nullString",

    /**
     * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     */
    metadata: null,

    /**
     * A brief description of the plan, hidden from customers.
     */
    nickname: "mock nickname",

    /**
     * The ID of the product this price is associated with.
     */
    product: "mock product id",

    /**
     * The recurring components of a price such as `interval` and `usage_type`.
     */
    recurring: null,


    /**
     * Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price. In `graduated` tiering, pricing can change as the quantity grows.
     */
    tiers_mode: 'graduated',

    /**
     * Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with `tiers`.
     */
    transform_quantity: null,

    /**
     * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
     */
    type: 'recurring',

    /**
     * The unit amount in %s to be charged, represented as a whole integer if possible.
     */
    unit_amount: -1,

    /**
     * The unit amount in %s to be charged, represented as a decimal string with at most 12 decimal places.
     */
    unit_amount_decimal: '-1'
});

export const mockProduct = (name = faker.commerce.productName()): Stripe.Product => ({
    /**
           * The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
           */
    name,

    /**
     * Whether the product is currently available for purchase. Defaults to `true`.
     */
    active: true,

    /**
     * A list of up to 5 alphanumeric attributes. Should only be set if type=`good`.
     */
    attributes: [],

    /**
     * A short one-line description of the product, meant to be displayable to the customer. May only be set if type=`good`.
     */
    caption: "test",

    /**
     * An array of Connect application names or identifiers that should not be able to order the SKUs for this product. May only be set if type=`good`.
     */
    deactivate_on: [],

    /**
     * The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
     */
    description: "test",

    /**
     * Specifies which fields in the response should be expanded.
     */
    // expand: "",

    object: null,
    livemode: false,
    created: -1,
    updated: -1,


    /**
     * An identifier will be randomly generated by Stripe. You can optionally override this ID, but the ID must be unique across all products in your Stripe account.
     */
    id: "test",

    /**
     * A list of up to 8 URLs of images for this product, meant to be displayable to the customer.
     */
    images: [],

    /**
     * Set of [key-value pairs](https: "test",
     */
    metadata: null,

    /**
     * The dimensions of this product for shipping purposes. A SKU associated with this product can override this value by having its own `package_dimensions`. May only be set if type=`good`.
     */
    package_dimensions: null,

    /**
     * Whether this product is shipped (i.e., physical goods). Defaults to `true`. May only be set if type=`good`.
     */
    shippable: false,

    /**
     * An arbitrary string to be displayed on your customer's credit card or bank statement. While most banks display this information consistently, some may display it incorrectly or not at all.
     *
     * This may be up to 22 characters. The statement description may not include `<`, `>`, `\`, `"`, `'` characters, and will appear on your customer's statement in capital letters. Non-ASCII characters are automatically stripped.
     *  It must contain at least one letter.
     */
    statement_descriptor: "test",

    /**
     * The type of the product. Defaults to `service` if not explicitly specified, enabling use of this product with Subscriptions and Plans. Set this parameter to `good` to use this product with Orders and SKUs. On API versions before `2018-02-05`, this field defaults to `good` for compatibility reasons.
     */
    type: null,

    /**
     * A label that represents units of this product in Stripe and on customers' receipts and invoices. When set, this will be included in associated invoice line item descriptions.
     */
    unit_label: "test",

    /**
     * A URL of a publicly-accessible webpage for this product. May only be set if type=`good`.
     */
    url: "test",
})