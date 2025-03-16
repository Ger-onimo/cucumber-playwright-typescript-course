# @regression runs all tests under the regression tags wherever they occur - npm run cucumber regression
# @contact-us only runs the contact-us tag in this case just this feature file - npm run cucumber contactUs
@regression @contact-us
Feature: WebdriverUniversity.com - Contact Us Page
# use Background to reduce repetition - these can only be used BEFORE a scenario
    Background: Pre conditions
        Given I navigate to the webdriveruniversity homepage
        When I click on the contact us button
        And I switch to the new browser tab

    Scenario: Valid Contact Us Form Submission
        And I type a first name
        And I type a last name
        And I enter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    # Scenario same as above with email removed
    Scenario: Invalid Contact Us Form Submission - missing email
        And I type a first name
        And I type a last name
        And I type a comment
        And I click on the submit button
        Then I should be presented with an unsuccessful contact us message

    # Lesson 40 - fixed data
    Scenario: Valid Contact Us Form Submission - Using Specific Data
        And I type a specific first name "Sarah"
        And I type a specific last name "Woods"
        And I enter a specific email address "sarah_woods@example.com"
        And I type specific text "Hello World!" and a number 2 within the comment input field
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    # Lesson 43 > 45 - create random user details
    Scenario: Valid Contact Us Form Submission - Using Random Data
        And I type a random first name
        And I type a random last name
        And I enter a random email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    # Lesson 46 > 48 - parameters to reduce code for DNR
    # @smoke will only run the smoke tags wherever they occur - npm run cucumber smoke
    @smoke 
    Scenario Outline: Validate Contact Us Page
        And I type a first name <firstName> and a last name <lastName>
        And I type an email address '<emailAddress>' and a comment '<comment>'
        And I click on the submit button
        Then I should be presented with header text '<message>'

        Examples:
            | firstName | lastName | emailAddress         | comment                 | message                     |
            | John      | Jones    | j_jones@example.com  | Hello World?            | Thank You for your Message! |
            | Mia       | Carter   | m_carter@example.com | Hi there!               | Thank You for your Message! |
            | Grace     | Hudson   | grace_hudson         | Do you create websites? | Invalid email address       |
