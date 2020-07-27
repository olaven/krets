/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('responses', {
        contact_details: {

            type: 'varchar(100)',
            notNull: false
        }
    });
};

exports.down = pgm => { };
