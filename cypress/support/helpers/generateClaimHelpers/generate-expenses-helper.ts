import expensesInitClass from "../../init/claimInit/expenses-init";

const baseUrl = Cypress.config("baseUrl");

export let EXPENSES_ID: string;
export let EXPENSES_NAME: string;

export const URLs = {
  expensesURL: `${baseUrl}/web/index.php/api/v2/claim/expenses/types`,
};

export default class GenerateExpensesHelper {
  static addExpensesViaAPI() {
    return new Cypress.Promise((resolve, reject) => {
      cy.request({
        method: "POST",
        url: `${URLs.expensesURL}`,
        body: expensesInitClass.initExpenses(),
      }).then((response) => {
        EXPENSES_ID = response.body.data.id;
        EXPENSES_NAME = response.body.data.name;
        resolve(EXPENSES_ID);
        resolve(EXPENSES_NAME);
        cy.log(`---- SUCCESSFULL: ADMIN ADD ${EXPENSES_NAME} ----`);
      });
    });
  }

  static deleteExpenses() {
    cy.request({
      method: "DELETE",
      url: `${URLs.expensesURL}`,
      body: {
        ids: [EXPENSES_ID],
      },
    }).then(() => {
      cy.log(`---- SUCCESSFULL: DELETE ${EXPENSES_NAME} ----`);
    });
  }
}
