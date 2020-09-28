/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.addColumn("questions", {
        archived: {
            type: 'boolean',
            notNull: true,
            default: false,
        }
    });
};

exports.down = pgm => { };
