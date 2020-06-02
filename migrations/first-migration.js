/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("users", {
        id: {
            type: "varchar(500)",
            primaryKey: true,
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createTable('pages', {
        id: {
            type: "serial",
            primaryKey: true,
        },
        ownerId: {
            type: 'string',
            notNull: true,
            references: '"users"'
        },
        name: {
            type: "varchar(800)",
            notNull: true
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });
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
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });
    pgm.createTable("responses_to_pages", {
        id: "id",
        pageId: {
            references: "pages",
            notNull: true
        },
        responseId: {
            references: "responses",
            notNull: true
        }
    });
    pgm.createIndex('posts', 'userId')
};

exports.down = pgm => {};
