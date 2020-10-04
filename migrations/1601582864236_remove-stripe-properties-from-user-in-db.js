/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.dropColumns("users", [
        "customer_id", "subscription_id", "product_id", "invoice_paid"
    ], { ifExists: true, });
};

exports.down = pgm => { };
