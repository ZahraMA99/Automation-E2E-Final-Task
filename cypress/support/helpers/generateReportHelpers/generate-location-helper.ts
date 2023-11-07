import { GenerateLocationPayload } from "../../interfaces/payload/GenerateLocationPayloadInterface";
import LocationInitClass from "../../init/location-init";

const baseUrl = Cypress.config("baseUrl");

let LOCATION_ID: number;
export let LOCATION: string;

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
        LOCATION = response.body.data.name;
        resolve(LOCATION_ID);
      });
    });
  }
}
