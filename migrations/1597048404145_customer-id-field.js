/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.addColumns('users',
        {
            customer_id: {
                type: 'varchar(100)', //NOTE: Should be more than enough for customer ID length of 20. Left room, as this may change at Stripe. (https://stripe.com/docs/api/customers)
                notNull: true,
                default: "default_customer_id"
            }
        },
        { ifNotExists: true });
};

exports.down = pgm => { };
