import LoginPage from "../../support/page-objects/login-page";
import CreateEmployeeWithJobDetailsHelper from "../../support/helpers/generateReportHelpers/create-employees-with-job-location-salary-helper";
import ReportPage from "../../support/page-objects/report-page";

const loginPageObj: LoginPage = new LoginPage();
const reportPageObj: ReportPage = new ReportPage();

describe("OrangHRM - Generate an Employee report with search criteria", () => {
  beforeEach(function () {
    cy.visit("/").as("LoginPage");
    cy.fixture("login-data").as("login-data");
    cy.get("@login-data").then((data: any) => {
      loginPageObj.userLogin(data.username, data.password);
    });
  });
  // name convension
  it("O1: Generate an Employee report with search criteria", () => {
    CreateEmployeeWithJobDetailsHelper.createEmployeeWithJobDetails();
    reportPageObj.generateReport();
  });
});
