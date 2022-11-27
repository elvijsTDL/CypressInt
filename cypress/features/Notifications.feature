Feature: Test cases with notifications
  Background:
    Given the database is seeded

  Scenario: Rendering an empty notifications state
    Given Notifications are mocked to an empty state
    And User is logged in with xState
    And Notifications counter does not show a number
    And User opens the notifications page
    And Empty notifications screen is visible

  Scenario: User A likes a transaction of User B , B gets notification that A liked it
    And User intercepts the notification requests
    And User is logged in with xState
    And User visits the transaction with User B
    And The user likes the transaction
    And Logged in user gets switched to User B
    And User opens the notifications page
    And The notification badge count is shown correctly
    And User dismisses the notification

  Scenario: User A sends payment to User B
    And User intercepts the payment requests
    And User is logged in with xState
    And User creates a transaction to User B with UI
    And Logged in user gets switched to User B
    And The User B has received the payment and the transaction is visible in the main page
