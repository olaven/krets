/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropColumn("embeddables", "origin")
};

exports.down = pgm => { };
