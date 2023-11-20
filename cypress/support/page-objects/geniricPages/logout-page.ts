export default class LogoutPage{
    elements = {
        dropDown: () => cy.get(".oxd-userdropdown-tab > .bi-caret-down-fill"),
        logoutBtn: () => cy.contains('.oxd-userdropdown-link', "Logout"),
    }

    logOut(){
        this.elements.dropDown().click({force: true});
        this.elements.logoutBtn().click();
    }
}