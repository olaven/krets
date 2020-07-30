/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.sql(`
        UPDATE responses 
        SET emotion = 
            CASE
                WHEN (emotion = ':-)') THEN '2'
                WHEN (emotion = ':-|') THEN '1'
                WHEN (emotion = ':-(') THEN '0'
                ELSE '0' -- some values may not adhere to expected format
            END 
    `);

    pgm.sql(`
        ALTER TABLE "responses"
            ALTER "emotion" SET DATA TYPE integer
            USING emotion::integer
    `)

    pgm.addConstraint("responses", "valid-emotion-integer", {
        check: 'emotion >= 0 and emotion <= 2'
    });

};

exports.down = pgm => { };
