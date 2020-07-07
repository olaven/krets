/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

    pgm.addConstraint("responses_to_pages", "responses_to_pages_deleted_if_page_deleted",
        "on delete cascade"
    );

    //pgm.addConstraint("responses")
};

exports.down = pgm => { };
