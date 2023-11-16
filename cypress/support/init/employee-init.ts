import GenerateRandomNumberClass from "../generic-functions/generate-random-numbers";
import { CreateEmployeePayload } from "../interfaces/payload/CreateEmployeePayloadInterface";
import { EmployeeJobDetailsPayload } from "../interfaces/payload/EmployeeJobDetailsPayload";

let randomNumber = GenerateRandomNumberClass.generateRandomNumber();

export default class EmployeeInitClass {
  static initNewEmployee(): CreateEmployeePayload {
    return {
      empPicture: null,
      employeeId: `0${randomNumber}`,
      firstName: `Lela_${GenerateRandomNumberClass.generateRandomNumber()}`,
      lastName: `L${randomNumber}`,
      middleName: "",
    };
  }

  static initEmployeeJobDetails(
    jobTitleID: number,
    locationID: number
  ): EmployeeJobDetailsPayload {
    return {
      jobTitleId: jobTitleID,
      joinedDate: null,
      locationId: locationID,
    };
  }

  static initEmployeeSalary() {
    return {
      addDirectDeposit: false,
      comment: null,
      currencyId: "ILS",
      salaryAmount: `${GenerateRandomNumberClass.generateRandomNumber()}000`,
      salaryComponent: "Basic Salary",
    };
  }
}
