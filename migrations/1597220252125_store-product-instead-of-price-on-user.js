/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm
        .renameColumn('users', 'price_id', 'product_id')

    pgm.addColumns('users',
        {
            free_premium: {
                type: 'boolean',
                notNull: true,
                default: false
            },
        },
        {
            ifNotExists: true
        }
    )
}

exports.down = pgm => { };
