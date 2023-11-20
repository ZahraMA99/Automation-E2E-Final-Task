import GenerateLocationHelper from "./generate-location-helper";
import GenerateJobTitleHelper from "./generate-job-title-helper";
import CreateNewEmployeeHelper from "./create-new-employee-helper";

let LOCATION_ID: number;
let JOB_TITLE_ID: number;
let EMPLOYEE_NUMBER: string;
let NUM_OF_EMPLOYEES: number = 3;

export default class GenerateReportHelper {
  static createEmployeeWithJobDetails() { // 
    // Generate location
    GenerateLocationHelper.addLocationViaAPI().then((resolve) => {
      LOCATION_ID = parseInt(`${resolve}`, 10);
      // Generate job
      GenerateJobTitleHelper.addJobTitlesViaAPI().then((resolve) => {
        JOB_TITLE_ID = parseInt(`${resolve}`, 10);
        // create 3 employee with job details
        for (let i = 0; i < NUM_OF_EMPLOYEES; i++) {
          CreateNewEmployeeHelper.addNewEmployeeViaAPI().then((resolve) => {
            EMPLOYEE_NUMBER = `${resolve}`;
            CreateNewEmployeeHelper.modifyJobDetails(
              EMPLOYEE_NUMBER,
              JOB_TITLE_ID,
              LOCATION_ID
            );
            // add salary for the employee
            CreateNewEmployeeHelper.addEmployeeSalary(EMPLOYEE_NUMBER);
          });
        }
      });
    });
  }
}
