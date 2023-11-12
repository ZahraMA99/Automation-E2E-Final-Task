import { GenerateExpensesPayload } from "../../interfaces/payload/claimPayload/GenerateExpensesPayload";
import GenerateRandomNumberClass from "../../generic-functions/generate-random-numbers";

export default class expensesInitClass {
  static initExpenses(): GenerateExpensesPayload {
    return {
      description: `Expense_${GenerateRandomNumberClass.generateRandomNumber()} description`,
      name: `Expense_${GenerateRandomNumberClass.generateRandomNumber()}`,
      status: true,
    };
  }
}
