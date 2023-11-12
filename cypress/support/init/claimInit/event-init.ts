import { GenerateEventPayload } from "../../interfaces/payload/claimPayload/GenerateEventPayload";
import GenerateRandomNumberClass from "../../generic-functions/generate-random-numbers";

//let randomNumber = GenerateRandomNumberClass.generateRandomNumber();

export default class eventInitClass {
  static initEvent(): GenerateEventPayload {
    return {
      description: `Event_${GenerateRandomNumberClass.generateRandomNumber()} description`,
      name: `Event_${GenerateRandomNumberClass.generateRandomNumber()}`,
      status: true,
    };
  }
}
