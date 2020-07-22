/* eslint-disable camelcase */

exports.shorthands = undefined;

const categoriesTable = {
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
};

const categoryColumn = {
    category_id: {
        type: 'integer',
        references: '"categories" (id)',
        notNull: false
    },
}

exports.up = pgm => {

    pgm.createTable('categories', categoriesTable, { ifNotExists: true });
    pgm.addColumns('pages', categoryColumn, { ifNotExists: true });
};

exports.down = pgm => { };
