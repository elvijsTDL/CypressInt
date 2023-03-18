Feature: Sign in page test cases

  Scenario: A user logging in
    Given Main page is visited
    And User inputs their login details
    And User clicks on the sign in button
    Then User is redirected to the home page

  Scenario: Registering a new user
    Given Main page is visited
    Given User clicks on the sign up link
    And User inputs new user details
    And User clicks on the sign up button
    Then The new user can log into their account

  Scenario Outline: Empty field error messages in sign up form
    Given Main page is visited
    Given User clicks on the sign up link
    And User clicks on the "<field>"
    And User clicks on the disabled sign up button
    Then <field> has an error message saying <message>
    Examples:
      | field           | message                |
      | firstName       | First Name is required |
      | lastName        | Last Name is required  |
      | username        | Username is required   |
      | password        | Enter your password    |
      | confirmPassword | Confirm your password  |
