Feature: Actions with bank accounts

  Background:
    Given The database is seeded
    And Bank account requests are mocked to an empty state
    Given User is logged in with xState

  @mocked
  Scenario: Onboarding screen visible when user has no bank accounts
    Then User is redirected to the home page
    And User goes to the bank accounts section
    And User can see an empty bank account screen
