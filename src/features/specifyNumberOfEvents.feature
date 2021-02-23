Feature: SPECIFY NUMBER OF EVENTS

    Scenario: When user hasn’t specified a number, 12 is the default number

        Given the user has selected their search constraints (or left them null) for events
        When the user loads their events list without changing any default settings
        Then the user will see no more than 12 events at a time in the list

    Scenario: User can change the number of events they want to see

        Given the user has selected their search constraints (or left them null) for events
        When the user changes the settings for number of events listed from the default to “x”
        Then the user will see no more than “x” amount of events at a time in the list