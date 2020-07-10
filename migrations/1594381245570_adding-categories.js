/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.createTable('categories', {
        id: {
            type: 'varchar(800)',
            primaryKey: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        name: {
            type: 'varchar(800)',
            notNull: true
        },
    }, { ifNotExists: true });

    pgm.addColumns('pages', {
        category_id: {
            type: 'varchar(800)',
            references: 'categories',
        },
    })
};

exports.down = pgm => { };
