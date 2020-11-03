/// <reference types="cypress" />
import { database } from "../../../src/database/database"
import { randomUser } from "../../unit/database/databaseTestUtils"

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfig) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    createUser: (id: string) =>
      database.users.createUser(
        randomUser(id)
      )
  })
}
