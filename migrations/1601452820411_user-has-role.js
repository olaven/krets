/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.addColumn("users", {
        role: {
            type: 'varchar(50)',
            notNull: true,
            default: "basic"
        }
    })
};

exports.down = pgm => { };
