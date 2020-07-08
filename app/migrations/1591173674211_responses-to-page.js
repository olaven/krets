/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.addColumn('responses', {
    page_id: {

      type: 'varchar(800)',
      notNull: true

    }
  })
}

exports.down = pgm => {
}
