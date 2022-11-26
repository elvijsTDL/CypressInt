Feature: Actions with bank accounts
  Background:
    Given the database is seeded
    And User is logged in with xState

  Scenario: Rendering an empty bank account state
    Then User is redirected to the home page
    And User goes to the bank accounts section
