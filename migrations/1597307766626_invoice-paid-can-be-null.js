/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.alterColumn("users", "invoice_paid", {
        notNull: false
    })
};

exports.down = pgm => { };
