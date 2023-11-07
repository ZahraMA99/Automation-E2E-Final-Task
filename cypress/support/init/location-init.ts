import GenerateRandomNumberClass from "../generic-functions/generate-random-numbers";
import { GenerateLocationPayload } from "../interfaces/payload/GenerateLocationPayloadInterface";

let randomNumber = GenerateRandomNumberClass.generateRandomNumber();

export default class LocationInitClass {
  static initLocation(): GenerateLocationPayload {
    return {
      name: `Central Park ${randomNumber}`,
      countryCode: `PS`,
      province: `CP${randomNumber}`,
      city: `Gaza ${randomNumber}`,
      address: `Sea Street ${randomNumber}`,
      zipCode: `${randomNumber}`,
      phone: `+9705950214${randomNumber}`,
      fax: `265${randomNumber}`,
      note: `Location-${randomNumber}`,
    };
  }
}
