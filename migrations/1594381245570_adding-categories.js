/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.createTable('categories', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        owner_id: {
            type: 'varchar(500)',
            notNull: true,
            references: '"users"'
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
            type: 'integer',
            references: '"categories" (id)',
            notNull: false
        },
    }, { ifNotExists: true });
};

exports.down = pgm => { };
