import CreateNewEmployeeHelper from "../generateReportHelpers/create-new-employee-helper";
import GenerateEventHelper from "./generate-event-helper";
import GenerateExpensesHelper from "./generate-expenses-helper";
import ClaimPage from "../../page-objects/claimPages/claim-page";
import { EMPLOYEE_NAME } from "../generateReportHelpers/create-new-employee-helper";

const claimPageObj: ClaimPage = new ClaimPage();

let NUM_OF_EMPLOYEES: number = 2;

export default class GenerateClaimHelper {
  static requestClaimWithApproveStatusApproved() {
    for (let i = 0; i < NUM_OF_EMPLOYEES; i++) {
      // create event
      GenerateEventHelper.addEventViaAPI();
      // create expenses
      GenerateExpensesHelper.addExpensesViaAPI();
      // create new employee with login details
      CreateNewEmployeeHelper.addNewEmployeeViaAPI().then(() => {
        CreateNewEmployeeHelper.createLoginDetailsViaAPI().then(() => {
          claimPageObj.createClaimRequestByEmployee();
          claimPageObj.approveClaimByAdmin();
        });
      });
    }
  }

  static requestClaimWithRejecteStatus() {
    for (let i = 0; i < NUM_OF_EMPLOYEES; i++) {
      // create event
      GenerateEventHelper.addEventViaAPI();
      // create expenses
      GenerateExpensesHelper.addExpensesViaAPI();
      // create new employee with login details
      CreateNewEmployeeHelper.addNewEmployeeViaAPI().then(() => {
        CreateNewEmployeeHelper.createLoginDetailsViaAPI().then(() => {
          claimPageObj.createClaimRequestByEmployee();
          claimPageObj.rejectClaimByAdmin();
        });
      });
    }
  }

  static validateTableRow() {
    claimPageObj.validateTableRow("Status", "Paid");
    claimPageObj.validateTableRow("Status", "Rejected");
    claimPageObj.validateTableRow("Employee Name", `${EMPLOYEE_NAME}`);
  }
}
