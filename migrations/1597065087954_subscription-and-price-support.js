/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.addColumns('users',
        {
            subscription_id: {
                type: 'varchar(100)',
            },
            price_id: {
                type: 'varchar(100)',
            },
        },
        { ifNotExists: true });
};

exports.down = pgm => { };
