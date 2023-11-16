import LoginPage from "../../support/page-objects/login-page";
import GenerateReportHelper from "../../support/helpers/generateReportHelpers/generate-report-helper";
import ReportPage from "../../support/page-objects/report-page";
import CreateNewEmployeeHelper from "../../support/helpers/generateReportHelpers/create-new-employee-helper";
import GenerateJobTitleHelper from "../../support/helpers/generateReportHelpers/generate-job-title-helper";
import GenerateLocationHelper from "../../support/helpers/generateReportHelpers/generate-location-helper";

const loginPageObj: LoginPage = new LoginPage();
const reportPageObj: ReportPage = new ReportPage();

describe("OrangHRM - Generate an Employee report", () => {
  beforeEach(function () {
    cy.visit("/").as("LoginPage");
    cy.fixture("login-data").as("login-data");
    cy.get("@login-data").then((data: any) => {
      loginPageObj.userLogin(data.username, data.password);
    });
  });

  afterEach(function () {
    //CreateNewEmployeeHelper.deleteEmployee();
    GenerateJobTitleHelper.deleteJob();
    GenerateLocationHelper.deleteLocation();
    //reportPageObj.deleteReport();
  });

  it("O1: Generate an Employee report", () => {
    GenerateReportHelper.createEmployeeWithJobDetails();
    reportPageObj.generateReport();
    //reportPageObj.reportValidation();
  });
});
