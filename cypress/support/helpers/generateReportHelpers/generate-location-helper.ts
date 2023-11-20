import LocationInitClass from "../../init/reportInit/location-init";

const baseUrl = Cypress.config("baseUrl");

let LOCATION_ID: number;
export let LOCATION_NAME: string;

export const URLs = {
  locationURL: `${baseUrl}/web/index.php/api/v2/admin/locations`,
};
export default class GenerateLocationHelper {
  static addLocationViaAPI() {
    return new Cypress.Promise((resolve, reject) => {
      cy.request({
        method: "POST",
        url: `${URLs.locationURL}`,
        body: LocationInitClass.initLocation(),
      }).then((response) => {
        cy.log("---- SUCCESSFULL: ADMIN ADD NEW LOCATION ----");
        LOCATION_ID = response.body.data.id;
        LOCATION_NAME = response.body.data.name;
        resolve(LOCATION_ID);
      });
    });
  }

  static deleteLocation() {
    cy.request({
      method: "DELETE",
      url: `${URLs.locationURL}`,
      body: {
        ids: [LOCATION_ID],
      },
    }).then(() => {
      cy.log("---- SUCCESSFULL: DELETE LOCATION ----");
    });
  }
}
