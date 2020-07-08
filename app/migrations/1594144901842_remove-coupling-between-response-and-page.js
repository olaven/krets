/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    /**
     * A response does only belong to one page. 
     * I.e. this is not a many-to-many, and coupling table 
     * is not needed.
     */
    pgm.dropTable("responses_to_pages")
};

exports.down = pgm => { };
