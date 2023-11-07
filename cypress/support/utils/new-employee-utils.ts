import { CreateEmployeePayload } from "../interfaces/payload/CreateEmployeePayloadInterface";
import { CreateEmployeeResponse } from "../interfaces/response/CreateEmployeeResponse";

declare global {
  namespace Cypress {
    interface Chainable {
      addNewEmployee: (
        method: string,
        requestURL: string,
        employeePayload: CreateEmployeePayload
      ) => Chainable<CreateEmployeeResponse>;
    }
  }
}

Cypress.Commands.add(
  "addNewEmployee",
  (
    method: string,
    requestURL: string,
    employeeLoginAccountPayload: CreateEmployeePayload
  ) => {
    return cy
      .request({
        method: method,
        url: requestURL,
        body: employeeLoginAccountPayload,
      })
      .its("body");
  }
);
