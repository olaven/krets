/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn("pages", {
        mandatory_contact_details: {
            type: 'boolean',
            notNull: true,
            default: false
        }
    })
};

exports.down = pgm => { };
