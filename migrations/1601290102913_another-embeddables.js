/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.createTable("embeddables", {
        id: {
            type: "serial",
            primaryKey: true
        },
        token: {
            type: 'varchar',
            notNull: true
        },
        origin: {
            type: 'varchar(500)',
            notNull: true
        },
        page_id: {
            type: 'varchar',
            references: 'pages',
            notNull: true
        },
    }, { ifNotExists: true });
};

exports.down = pgm => { };
