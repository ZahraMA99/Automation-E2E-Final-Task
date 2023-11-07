import { CreateEmployeePayload } from "../../interfaces/payload/CreateEmployeePayloadInterface";
import EmployeeInitClass from "../../init/employee-init";

const baseUrl = Cypress.config("baseUrl");

export const URLs = {
  newEmployeeURL: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  newEmployeeJobDetailsURL: `${baseUrl}/web/index.php/api/v2/pim/employees`,
};

let EMPLOYEE_NUMBER: string;

export default class CreateNewEmployeeHelper {
  static addNewEmployeeViaAPI() {
    return new Cypress.Promise((resolve, reject) => {
      cy.addNewEmployee(
        "POST",
        URLs.newEmployeeURL,
        EmployeeInitClass.initNewEmployee()
      ).then((response) => {
        EMPLOYEE_NUMBER = response.data.empNumber;
        resolve(EMPLOYEE_NUMBER);
      });
    });
  }

  static modifyJobDetails(empNum: string, jobTitleID: number, locationID:number) {
    cy.request({
      method: "PUT",
      url: `${URLs.newEmployeeJobDetailsURL}/${empNum}/job-details`,
      body: EmployeeInitClass.initEmployeeJobDetails(jobTitleID, locationID),
    }).then(() => {
      cy.log("---- SUCCESSFULL: UPDATE EMPLOYEE JOB DETAILS ----");
    });
  }

  static addEmployeeSalary(empNum: string) {
    cy.request({
      method: "POST",
      url: `${URLs.newEmployeeJobDetailsURL}/${empNum}/salary-components`,
      body: EmployeeInitClass.initEmployeeSalary(),
    }).then(() => {
      cy.log("---- SUCCESSFULL: UPDATE EMPLOYEE SALARY ----");
    });
  }
}
