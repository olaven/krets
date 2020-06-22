/* eslint-disable camelcase */

exports.shorthands = undefined;


exports.up = pgm => {

    pgm.createType({
        name: "plan", 
        values: [ //TODO: change plan-names when I know better
            "prerelease", 
            "basic", 
            "advanced",
            "pro"
        ]

    })
    pgm.createTable("payments", {
        checkout_session_id: { //TODO: I think I need an endpoint generating these 
            type: "varchar(550)",
            primaryKey: true,
        },
        user_id: {
            type: 'varchar(500)',
            notNull: true,
            references: '"users"'
        },
        membership_type: {
            type: "plan", 
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    }, {ifNotExists: true});
};

exports.down = pgm => {};
