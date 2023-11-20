import moment from "moment";
import {
  EMPLOYEE_USERNAME,
  EMPLOYEE_PASSWORD,
} from "../../helpers/generateReportHelpers/create-new-employee-helper";
import { EVENT_NAME } from "../../helpers/generateClaimHelpers/generate-event-helper";
import { EXPENSES_NAME } from "../../helpers/generateClaimHelpers/generate-expenses-helper";
import LoginPage from "../geniricPages/login-page";
import LogoutPage from "../geniricPages/logout-page";
import GenerateRandomNumberClass from "../../generic-functions/generate-random-numbers";

const loginObj: LoginPage = new LoginPage();
const logoutObj: LogoutPage = new LogoutPage();

let amount = GenerateRandomNumberClass.generateRandomNumber();

export default class ClaimPage {
  elements = {
    sidebar: () => cy.get(".oxd-sidepanel-body"),
    navbar: () => cy.get(".oxd-topbar-body-nav"),
    select: () => cy.get(".oxd-select-text-input"),
    eventOption: () => cy.get(".oxd-select-dropdown.--positon-bottom"),
    remarks: () => cy.get(".oxd-textarea"),
    createBtn: () => cy.get('[type="submit"]'),
    submitBtn: () => cy.get(".orangehrm-action-buttons-container"),
    empName: () => cy.get('[placeholder="Type for hints..."]'),
    addBtn: () => cy.get('[type="button"]'),
    dateInput: () => cy.get(".oxd-date-input"),
    calendarForm: () => cy.get(".oxd-date-input-calendar"),
    amountInput: () =>
      cy.get(
        ".oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ),
    searchBtn: () => cy.get(".oxd-form-actions > .oxd-button--secondary"),
    tableCard: () => cy.get(".oxd-table-card"),
    approveBtn: () =>
      cy.get(".orangehrm-action-buttons-container > .oxd-button--secondary"),
    rejectBtn: () =>
      cy.get(".orangehrm-action-buttons-container > .oxd-button--danger"),
    tableHeader: () => cy.get(".oxd-table-header"),
    tableBody: () => cy.get(".oxd-table-body"),
  };

  logoutLogin(username: string, password: string) {
    logoutObj.logOut();
    loginObj.userLogin(username, password);
  }

  clickIntoClaimLink() {
    this.elements.sidebar().contains("Claim").click();
  }

  clickIntoSubmitClaimLink() {
    cy.fixture("navbar-links").as("nav-links");
    cy.get("@nav-links").then((link: any) => {
      this.elements
        .navbar()
        .contains(link.employeeNavlinks.SubmitClaim)
        .click();
    });
  }

  scrollAndChooseOption(nthChild: number, option: string) {
    this.elements.select().eq(nthChild).click({ force: true }).invoke("scroll");
    this.elements.eventOption().contains(option).click({ force: true });
  }

  selectEvent() {
    this.scrollAndChooseOption(0, EVENT_NAME);
  }

  selectCurrency() {
    this.scrollAndChooseOption(1, "Albanian Lek");
  }

  addRemarks() {
    cy.fixture("remarks").as("remarks");
    cy.get("@remarks").then((remark: any) => {
      this.elements.remarks().click().type(remark.Remarks);
    });
  }

  createClaim() {
    this.elements.createBtn().click();
  }

  submitClaim() {
    this.elements.submitBtn().contains("Submit").click();
  }

  clickIntoAddBtn(nthChild: number) {
    this.elements.addBtn().eq(nthChild).contains("Add").click({ force: true });
  }

  assignDate() {
    this.elements.dateInput().click();
    const currentDate = moment();
    const futureDate = currentDate.add(7, "days");
    const formattedFutureDate = futureDate.format("DD");
    this.elements
      .calendarForm()
      .contains(formattedFutureDate)
      .click({ force: true });
  }

  typeAmount() {
    this.elements.amountInput().eq(0).click({ force: true }).type(`${amount}`);
  }

  addExpenses() {
    this.clickIntoAddBtn(2);
    this.scrollAndChooseOption(0, EXPENSES_NAME);
    this.assignDate();
    this.typeAmount();
    this.elements.createBtn().contains("Save").click({ force: true });
  }

  createClaimRequestByEmployee() {
    this.logoutLogin(EMPLOYEE_USERNAME, EMPLOYEE_PASSWORD);
    this.clickIntoClaimLink();
    this.clickIntoSubmitClaimLink();
    this.selectEvent();
    this.selectCurrency();
    this.addRemarks();
    this.createClaim();
    this.addExpenses();
    this.submitClaim();
    cy.fixture("login-data").as("login-data");
    cy.get("@login-data").then((data: any) => {
      this.logoutLogin(data.username, data.password);
    });
  }

  clickIntoEmployeeClaimsLink() {
    cy.fixture("navbar-links").as("nav-links");
    cy.get("@nav-links").then((link: any) => {
      this.elements
        .navbar()
        .contains(link.adminNavLinks.EmployeeClaims)
        .click();
    });
  }

  clickIntoSearchBtn() {
    this.elements.searchBtn().contains("Search").click({ force: true });
  }

  searchForSpecificClaim() {
    this.selectEvent();
    this.clickIntoSearchBtn();
  }

  clickIntoViewDetails() {
    this.elements
      .tableCard()
      .eq(0)
      .contains("View Details")
      .click({ force: true });
  }

  searchOnClaimByAdmin() {
    this.clickIntoClaimLink();
    this.clickIntoEmployeeClaimsLink();
    this.searchForSpecificClaim();
    this.clickIntoViewDetails();
  }

  clickIntoApproveBtn() {
    this.elements.approveBtn().click({ force: true });
  }

  clickIntoRejectBtn() {
    this.elements.rejectBtn().click({ force: true });
  }

  approveClaimByAdmin() {
    this.searchOnClaimByAdmin();
    this.clickIntoApproveBtn();
    this.clickIntoEmployeeClaimsLink();
  }

  rejectClaimByAdmin() {
    this.searchOnClaimByAdmin();
    this.clickIntoRejectBtn();
    this.clickIntoEmployeeClaimsLink();
  }

  validateTableRow(columnHeader: string, expectedValue: any) {
    this.elements
      .tableHeader()
      .contains(columnHeader)
      .invoke("index")
      .then((colIndex) => {
        this.elements
          .tableBody()
          .find(".oxd-table-card")
          .each((element) => {
            cy.wrap(element)
              .find(".oxd-table-row.oxd-table-row--with-border")
              .find(".oxd-table-cell")
              .eq(colIndex)
              .invoke("text")
              .then((cell) => {
                if (cell.trim() == expectedValue.trim()) {
                  expect(
                    cell.trim(),
                    `Found the row with ${columnHeader} = ${expectedValue}`
                  ).to.equal(expectedValue);
                }
              });
          });
      });
  }
}
