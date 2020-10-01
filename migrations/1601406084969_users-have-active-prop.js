/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn("users", {
        active: {
            type: 'boolean',
            notNull: true,
            default: false
        }
    })
};

exports.down = pgm => { };
