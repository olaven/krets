/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.addColumn("questions", {
        display_order: {
            type: "integer",
            default: 0,
        }
    })
};

exports.down = pgm => { }
