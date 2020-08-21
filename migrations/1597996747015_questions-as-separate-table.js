

exports.shorthands = undefined;

exports.up = async (pgm) => {

    //TODO: create column in responses
    pgm.createTable("questions", {
        id: {
            type: "serial",
            primaryKey: true
        },
        page_id: {
            type: 'varchar',
            references: 'pages',
        },
        text: {
            type: "varchar(350)",
            notNull: true
        },
    }, { ifNotExists: true });

    pgm.createTable("answers", {
        id: {
            type: "serial",
            primaryKey: true
        },
        response_id: {
            type: 'integer',
            references: 'responses',
            notNull: true,
        },
        question_id: {
            type: 'integer',
            references: 'questions',
            notNull: false,
        },
        text: {
            type: "varchar(350)",
            notNull: true
        }
    }, { ifNotExists: true });

    pgm.sql(`
        WITH moved_responses AS (
            SELECT id, text FROM responses 
        )
        INSERT INTO answers(response_id, text) 
        SELECT id, text from moved_responses
    `);

    pgm.dropColumns("responses", ["text"])
};

exports.down = pgm => { };
