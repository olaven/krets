/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropColumn("embeddables", "origin", {
        ifExists: true
    })
};

exports.down = pgm => { };
