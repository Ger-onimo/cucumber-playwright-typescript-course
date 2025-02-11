Feature: WebdriverUniversity.com - Login Portal
    # use Background to reduce repetition - these can only be used BEFORE a scenario
    # Background: Pre conditions
    #     Given I navigate to the webdriveruniversity homepage
    #     When I click on the login portal link
    #     And I switch to the new browser tab

    # DNR version:
    Scenario Outline: Login Portal Valid & Invalid Validations
    # Navigate directly to the login page using the Given - cuts down time.
        Given I navigate to the webdriveruniversity login portal
        And I type a username <username>
        And I type a password <password>
        # And I wait for 2 seconds
        And I click on the login button
        Then I should be presented with an alert box with validation text '<expectedAlertText>'

        Examples:
            | username  | password     | expectedAlertText    |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | webdriver321 | validation failed    |
