/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.addColumn("pages", {
        custom_title: {
            type: "varchar(500)",
            notNull: false
        }
    });
};

exports.down = pgm => { };
