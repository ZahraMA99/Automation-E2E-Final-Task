import { CreateLoginDetailsPayload } from "../../interfaces/payload/reportPaylpad/CreateLoginDetailsPayloadInterface";
import { EMPLOYEE_NUMBER } from "../../helpers/generateReportHelpers/create-new-employee-helper";
import GenerateRandomNumberClass from "../../generic-functions/generate-random-numbers";

let randomNumber = GenerateRandomNumberClass.generateRandomNumber();
let USER_ROLE_ID: number = 2;

export default class LoginDetailsInitClass {
  static initLoginDetails(): CreateLoginDetailsPayload {
    return {
      empNumber: EMPLOYEE_NUMBER,
      password: `1710${randomNumber}/Mz`,
      status: true,
      userRoleId: USER_ROLE_ID,
      username: `Lela${GenerateRandomNumberClass.generateRandomNumber()}`,
    };
  }
}
