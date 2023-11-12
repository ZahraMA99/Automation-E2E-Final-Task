import EmployeeInitClass from "../../init/reportInit/employee-init";
import LoginDetailsInitClass from "../../init/genericInit/login-details-init";

const baseUrl = Cypress.config("baseUrl");

export let EMPLOYEE_NUMBER: string;
let EMPLOYEE_ID: number;
export let EMPLOYEE_NAME: string;
export let EMPLOYEE_USERNAME: string;
export let EMPLOYEE_PASSWORD: string;

export const URLs = {
  newEmployeeURL: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  newEmployeeJobDetailsURL: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  loginDetails: `${baseUrl}/web/index.php/api/v2/admin/users`,
};

export default class CreateNewEmployeeHelper {
  static addNewEmployeeViaAPI() {
    return new Cypress.Promise((resolve, reject) => {
      cy.addNewEmployee(
        "POST",
        URLs.newEmployeeURL,
        EmployeeInitClass.initNewEmployee()
      ).then((response) => {
        EMPLOYEE_NUMBER = response.data.empNumber;
        EMPLOYEE_NAME = (`${response.data.firstName} ${response.data.lastName}`);  //space
        EMPLOYEE_ID = response.data.employeeId;
        resolve(EMPLOYEE_NUMBER);
      });
    });
  }

  static modifyJobDetails(
    empNum: string,
    jobTitleID: number,
    locationID: number
  ) {
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

  static createLoginDetailsViaAPI() {
    return new Cypress.Promise((resolve, reject) => {
      cy.request({
        method: "POST",
        url: `${URLs.loginDetails}`,
        body: LoginDetailsInitClass.initLoginDetails(),
      }).then((response) => {
        EMPLOYEE_USERNAME = response.body.data.userName;
        EMPLOYEE_PASSWORD = LoginDetailsInitClass.initLoginDetails().password;
        resolve(EMPLOYEE_USERNAME);
        cy.log("---- SUCCESSFULL: CREATE EMPLOYEE LOGIN DETAILS ----");
      });
    });
  }

  static deleteEmployee() {
    cy.request({
      method: "DELETE",
      url: `${URLs.newEmployeeURL}`,
      body: {
        ids: [EMPLOYEE_ID],
      },
    }).then(() => {
      cy.log("---- SUCCESSFULL: DELETE EMPLOYEE ----");
    });
  }
}
