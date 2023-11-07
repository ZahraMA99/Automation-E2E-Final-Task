import { JOB_TITLE } from "../helpers/generateReportHelpers/generate-job-title-helper";
import { LOCATION } from "../helpers/generateReportHelpers/generate-location-helper";

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
    this.elements.reportName().click({ force: true }).type("Repo1"); // generte fixture for them
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
      //this.scrollAndChooseOption(2, JOB_TITLE_ID.toString());
    });
  }

  selectLocation() {
    cy.fixture("create-report").as("createReport");
    cy.get("@createReport").then((option: any) => {
      this.scrollAndChooseOption(0, option.Location);
      this.clickIntoPlusIcon(0);
      //this.scrollAndChooseOption(2, LOCATION_ID.toString());
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
}

// create keyword fixture for PIM, Report ...
// delete in after all 
// job title and location is null now ! ask rawan 