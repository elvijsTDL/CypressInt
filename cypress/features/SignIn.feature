Feature: Authorization test cases

  Background:
    Given Base page is open

  Scenario: A user logging in
    Given User inputs their login details
    And User clicks on the sign in
    Then User is redirected to the home page

  Scenario: Registering a new user
    Given User clicks on the sign up link
    And User inputs new user details
    And User clicks on the the sign up button
    Then The new user can log into their account

  @only
  Scenario Outline: Empty field error messages in sign up page
    Given User clicks on the sign up link
    And User clicks on the "<field>"
    And User clicks on the the disabled sign up button
    Then The <field> has an error message saying <message>
    Examples:
      | field           | message                |
      | firstName       | First Name is required |
      | lastName        | Last Name is required  |
      | username        | Username is required   |
      | password        | Enter your password    |
      | confirmPassword | Confirm your password  |

