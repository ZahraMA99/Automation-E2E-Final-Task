import eventInitClass from "../../init/claimInit/event-init";

const baseUrl = Cypress.config("baseUrl");

export let EVENT_ID: number;
export let EVENT_NAME: string;

export const URLs = {
  eventURL: `${baseUrl}/web/index.php/api/v2/claim/events`,
};

export default class GenerateEventHelper {
  static addEventViaAPI() {
    return new Cypress.Promise((resolve, reject) => {
      cy.request({
        method: "POST",
        url: `${URLs.eventURL}`,
        body: eventInitClass.initEvent(),
      }).then((response) => {
        EVENT_ID = response.body.data.id;
        EVENT_NAME = response.body.data.name;
        resolve(EVENT_ID);
        resolve(EVENT_NAME);
        cy.log(`---- SUCCESSFULL: ADMIN ADD ${EVENT_NAME} ----`);
      });
    });
  }

  static deleteEvent() {
    cy.request({
      method: "DELETE",
      url: `${URLs.eventURL}`,
      body: {
        ids: [EVENT_ID],
      },
    }).then(() => {
      cy.log(`---- SUCCESSFULL: DELETE ${EVENT_NAME} ----`);
    });
  }
}