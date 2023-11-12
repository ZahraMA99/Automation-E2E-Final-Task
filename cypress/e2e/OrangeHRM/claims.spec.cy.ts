import LoginPage from "../../support/page-objects/geniricPages/login-page";
import GenerateClaimHelper from "../../support/helpers/generateClaimHelpers/generate-claim-helper";
import GenerateEventHelper from "../../support/helpers/generateClaimHelpers/generate-event-helper";
import GenerateExpensesHelper from "../../support/helpers/generateClaimHelpers/generate-expenses-helper";

const loginPageObj: LoginPage = new LoginPage();

describe("OrangHRM - Claims request", () => {
  beforeEach(function () {
    cy.visit("/").as("LoginPage");
    cy.fixture("login-data").as("login-data");
    cy.get("@login-data").then((data: any) => {
      loginPageObj.userLogin(data.username, data.password);
    });
  });

  afterEach(function () {
    GenerateEventHelper.deleteEvent();
    GenerateExpensesHelper.deleteExpenses();
  });

  it("OFT2: Create claims requests", () => {
    GenerateClaimHelper.requestClaimWithApproveStatusApproved();
    GenerateClaimHelper.requestClaimWithRejecteStatus();
    GenerateClaimHelper.validateTableRow();
  });
});
