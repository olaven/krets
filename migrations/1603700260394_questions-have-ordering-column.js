/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.addColumn("questions", {
        order: {
            type: "integer",
        }
    })
};

exports.down = pgm => { }
