import { JOB_TITLE } from "../helpers/generateReportHelpers/generate-job-title-helper";
import { LOCATION } from "../helpers/generateReportHelpers/generate-location-helper";
import { EMPLOYEE_NAME } from "../helpers/generateReportHelpers/create-new-employee-helper";
import GenerateRandomNumberClass from "../generic-functions/generate-random-numbers";

let randomNumber = GenerateRandomNumberClass.generateRandomNumber();
let reportName = `Report_${randomNumber}`;
let COUNT_OF_ROWS = 3;
export default class ReportPage {
  elements = {
    sidebar: () => cy.get(".oxd-sidepanel-body"),
    navbar: () => cy.get(".oxd-topbar-body-nav"),
    addBtn: () => cy.get(".orangehrm-header-container"),
    reportName: () => cy.get('[placeholder="Type here ..."]'),
    SelectionCriteria: () => cy.get(".oxd-select-text-input"),
    SelectionCriteriaOptions: () =>
      cy.get(".oxd-select-dropdown.--positon-bottom"),
    plusIcon: () => cy.get(".bi-plus"),
    includeHeaderSwitch: () => cy.get(".oxd-switch-input--active"),
    saveBtn: () => cy.get('[type="submit"]'),
    reportNameHeader: () =>
      cy.contains(".oxd-text.oxd-text--h6.orangehrm-main-title"),
    tableHeader: () => cy.get(".group-rgRow"),
    reportRowsCount: () => cy.get(".oxd-text--count"),
    tableRow: () => cy.get('[type="rgRow"]'),
    tableBody: () => cy.get(".oxd-table-body"),
    deleteIcon: () => cy.get(".bi-trash"),
  };

  clickIntoPIMLink() {
    this.elements.sidebar().contains("PIM").click();
  }

  clickIntoReportsLink() {
    this.elements.navbar().contains("Reports").click();
  }

  clickIntoAddReportBtn() {
    this.elements.addBtn().contains("Add").click();
  }

  typeReportName() {
    this.elements.reportName().click({ force: true }).type(reportName);
  }

  scrollAndChooseOption(nthChild: number, option: string) {
    this.elements.SelectionCriteria().eq(nthChild).click().invoke("scroll");
    this.elements.SelectionCriteriaOptions().contains(option).click();
  }

  clickIntoPlusIcon(nthChild: number) {
    this.elements.plusIcon().eq(nthChild).click();
  }

  selectJobTitle() {
    cy.fixture("create-report").as("createReport");
    cy.get("@createReport").then((option: any) => {
      this.scrollAndChooseOption(0, option.JobTitle);
      this.clickIntoPlusIcon(0);
      this.scrollAndChooseOption(2, JOB_TITLE);
    });
  }

  selectLocation() {
    cy.fixture("create-report").as("createReport");
    cy.get("@createReport").then((option: any) => {
      this.scrollAndChooseOption(0, option.Location);
      this.clickIntoPlusIcon(0);
      this.scrollAndChooseOption(3, LOCATION);
    });
  }

  enableIncludeHeaderSwitch(nthChild: number) {
    this.elements.includeHeaderSwitch().eq(nthChild).click();
  }

  selectPersonalField() {
    cy.fixture("create-report").as("createReport");
    cy.get("@createReport").then((option: any) => {
      this.scrollAndChooseOption(4, option.displayTitle1);
      this.scrollAndChooseOption(5, option.displayField1);
      this.clickIntoPlusIcon(1);
      this.enableIncludeHeaderSwitch(0);
    });
  }

  selectJobField() {
    cy.fixture("create-report").as("createReport");
    cy.get("@createReport").then((option: any) => {
      this.scrollAndChooseOption(4, option.displayTitle2);
      this.scrollAndChooseOption(5, option.displayField2);
      this.clickIntoPlusIcon(1);
      this.enableIncludeHeaderSwitch(1);
    });
  }

  selectSalaryField() {
    cy.fixture("create-report").as("createReport");
    cy.get("@createReport").then((option: any) => {
      this.scrollAndChooseOption(4, option.displayTitle3);
      this.scrollAndChooseOption(5, option.displayField3);
      this.clickIntoPlusIcon(1);
      this.enableIncludeHeaderSwitch(2);
    });
  }

  saveReport() {
    this.elements.saveBtn().click();
  }

  generateReport() {
    this.clickIntoPIMLink();
    this.clickIntoReportsLink();
    this.clickIntoAddReportBtn();
    this.typeReportName();
    this.selectJobTitle();
    this.selectLocation();
    this.selectPersonalField();
    this.selectJobField();
    this.selectSalaryField();
    this.saveReport();
  }

  verifyReportName() {
    this.elements.reportNameHeader().contains(reportName);
  }

  confirmCorrectnessOfTableHeaders() {
    cy.fixture("create-report").as("createReport");
    cy.get("@createReport").then((option: any) => {
      this.elements
        .tableHeader()
        .find(".rgHeaderCell")
        .eq(0)
        .contains(option.displayTitle1);
      this.elements
        .tableHeader()
        .find(".rgHeaderCell")
        .eq(1)
        .contains(option.displayTitle2);
      this.elements
        .tableHeader()
        .find(".rgHeaderCell")
        .eq(2)
        .contains(option.displayTitle3);
    });
  }

  validateValuesInTableRows() {
    this.elements
      .tableRow()
      .eq(0)
      .contains('[data-rgcol="0"]', '[data-rgrow="0"]')
      .should("contain.text", EMPLOYEE_NAME);
    this.elements
      .tableRow()
      .eq(0)
      .contains('[data-rgcol="1"]', '[data-rgrow="0"]')
      .should("contain.text", JOB_TITLE);
  }

  verifyQuantityOfRowsInReport() {
    this.elements.tableRow().as("numberOfRows");
    cy.get("@numberOfRows").its("length").should("eq", COUNT_OF_ROWS);
  }

  reportValidation() {
    cy.wait(5000);
    //this.verifyReportName();
    this.confirmCorrectnessOfTableHeaders();
    //this.validateValuesInTableRows();
    //this.verifyQuantityOfRowsInReport();
  }

  deleteReport() {
    this.clickIntoPIMLink();
    this.clickIntoReportsLink();
    this.elements.tableBody().contains(reportName).as("report");
    this.elements.deleteIcon().as("deleteIcon");
    cy.get("@report").contains("@deleteIcon").click({ force: true });
  }
}
