/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('pages', {
        color: {
            type: 'char(7)', // HEX -> #AABBCC
            notNull: false
        }
    });
};

exports.down = pgm => { };
