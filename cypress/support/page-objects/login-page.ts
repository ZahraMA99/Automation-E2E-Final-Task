export default class LoginPage {
  elements = {
    userName: () => cy.get('[placeholder="Username"]'),
    password: () => cy.get('[placeholder="Password"]'),
    loginBtn: () => cy.get("button"),
  };

  typeUsername(username: string) {
    this.elements.userName().type(username);
  }

  typePassword(password: string) {
    this.elements.password().type(password);
  }

  clickIntoLoginBtn() {
    this.elements.loginBtn().click();
  }

  userLogin(username: string, password: string) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickIntoLoginBtn();
  }
}
