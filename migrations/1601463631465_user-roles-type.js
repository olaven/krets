/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addType("user_role", ["basic", "administrator"])
    pgm.dropColumn("users", "role")
    pgm.addColumn("users", {
        role: {
            type: 'user_role',
            notNull: true,
            default: "basic"
        }
    })
};



exports.down = pgm => { };
