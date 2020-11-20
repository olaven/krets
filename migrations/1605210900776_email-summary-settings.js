/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('users', {
        contact_email: {
            type: 'varchar(800)',
            notNull: false // as some users have reigstered before this 
        },
        wants_email_summary: {
            type: 'boolean',
            notNull: true,
            default: false,
        }
    })
};

exports.down = pgm => { };
