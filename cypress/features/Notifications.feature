Feature: Test cases with notifications
  Background:
    Given the database is seeded

  Scenario: Rendering an empty notifications state
    Given Notifications are mocked to an empty state
    And User is logged in with xState
    And Notifications counter does not exist
    And User opens the notifications page
    And Empty notifications screen is visible

