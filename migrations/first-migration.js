/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.decamelize = true;
    pgm.createTable("users", {
        id: {
            type: "varchar(500)",
            primaryKey: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    }, {ifNotExists: true});
    pgm.createTable('pages', {
        id: {
            type: "varchar(800)",
            primaryKey: true,
        },
        owner_id: {
            type: 'varchar(500)',
            notNull: true,
            references: '"users"'
        },
        name: {
            type: "varchar(800)",
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },

    }, { ifNotExists: true });
    pgm.createTable("responses", {
        id: {
            type: "serial",
            primaryKey: true,
        },
        emotion: {
            type: "varchar(100)", //TODO: enum
            notNull: true,
        },
        text: {
            type: "varchar(1500)",
            notNull: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    }, {ifNotExists: true});
    pgm.createTable("responses_to_pages", {
        id: {
            type: "serial",
            primaryKey: true
        },
        page_id: {
            type: "varchar(800)",
            references: "pages",
            notNull: true
        },
        response_id: {
            type: "serial",
            references: "responses",
            notNull: true
        },
    }, {ifNotExists: true});
};

exports.down = pgm => {};
