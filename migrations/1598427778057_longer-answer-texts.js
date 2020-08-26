/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.alterColumn("answers", "text", {
        type: "varchar(1500)",
        notNull: true
    });
};

exports.down = pgm => { };
