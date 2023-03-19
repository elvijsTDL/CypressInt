Feature: Notification test cases

  Background:
    Given The database is seeded

  @mocked @skip
  Scenario: Rendering an empty notifications state
    Given Notifications are mocked to an empty state
    Given User is logged in with xState
    And Notifications counter is not visible by the bell
    And User opens the notifications page
    And Empty notifications screen is visible

  Scenario:  User A likes a transaction of User B , B gets notification that A liked it
    And User intercepts the notification requests
    Given User is logged in with xState
    And User visits the transaction with User B
    And User likes the transaction
    And Logged in user gets switched to User B
    And User opens the notifications page
    And The notification badge count is shown correctly
    And User dismisses the notification


