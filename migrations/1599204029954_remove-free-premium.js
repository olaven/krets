/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropColumn("users", "free_premium")
};

exports.down = pgm => { };
