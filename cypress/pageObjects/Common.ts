import { User } from "../../src/models"

const NOTIFICATION_BADGE = "nav-top-notifications-count"
const NOTIFICATION_BELL = "nav-top-notifications-link"
export class Common {
    static openMainPage() {
        cy.visit("/");
    }

    static seedDatabase() {
        console.log(Cypress.env("defaultPassword"))
        cy.task("db:seed")
    }

    static loginUserWithxState() {
        cy.database("find", "users").then((user:User)=> {
           return cy.loginByXstate(user.username)
        })
    }

    static mockEmptyNotificationsState() {
        cy.intercept("GET" , "/notifications" , []).as("mockedNotifications")
    }

    static notificationCounterDoesNotExist() {
        cy.getBySel(NOTIFICATION_BADGE).find("span").should("not.have.text")
    }

    static openNotificationPage() {
        cy.getBySel(NOTIFICATION_BELL).click()

    }

    static switchToUserB() {
        cy.logoutByXstate()
        cy.database("filter", "users").then((users: User[]) => {
            cy.loginByXstate(users[1].username)
        })
    }

    static verifyNotificationBadgeCount() {
        cy.wait("@notificationsList").its("response.body.results.length").then(
            (notificationCount) => {
                cy.getBySel(NOTIFICATION_BADGE).should("have.text",notificationCount)
                cy.wrap(notificationCount).as("countBeforeDismissal")
            }
        )
    }

    static interceptNotificationApiCalls() {
        cy.intercept("GET", "/notifications").as("notificationsList")
        cy.intercept("PATCH","/notifications/*").as("updateNotification")
    }
}