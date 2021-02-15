# meet-app

React app built with CRA boiler-plate generator.
Hosted on gitpages: https://ksflynn007.github.io/meet-app/

User Stoy Feature 1: As a user, I should be able to filter events by city so that I can see events that are applicable to me.

SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

User Story Feature 2:
As a user, I should be able to toggle event’s details so that I can see either details for individual events or look at all events in a high-level view.

FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS
Scenario 1: An event element is collapsed by default
Given the user has entered in (or left empty) search constraints
When the user loads a list of events in that search
Then the user should see the events in collapsed form (ie; name and date only)

Scenario 2: User can expand an event to see its details
Given the user has loaded a list of upcoming events
When the user clicks on “See more/Expand” for one event in the list
Then the user should see all details relating to that one event in a larger window/area

Scenario 3: User can collapse an event to hide its details
Given the user has already opened up an expanded view of an event
When the user clicks on “See less/Collapse”
Then the user should go back to a collapsed view of the event in the list of all events from their search

User Story 3:
As a user, I should be able to change the number of events listed in a search so that I can see the events as I prefer to from a design/UI standpoint.

FEATURE 3: SPECIFY NUMBER OF EVENTS
Scenario 1: When user hasn’t specified a number, 32 is the default number
Given the user has selected their search constraints (or left them null) for events
When the user loads their events list without changing any default settings
Then the user will see no more than 32 events at a time in the list

Scenario 2: User can change the number of events they want to see
Given the user has selected their search constraints (or left them null) for events
When the user changes the settings for number of events listed from the default to “x”
Then the user will see no more than “x” amount of events at a time in the list

User Story 4:
As a user, I should be able to see old search information so that I can view details of an event while on the go/out of connection.

FEATURE 4: USE THE APP WHEN OFFLINE
Scenario 1: Show cached data when there’s no internet connection
Given the user has done a previous search for events in the app
When the user goes offline and checks their app
Then the user should still be able to view their old search results from the time of the search

Scenario 2: Show error when user changes the settings (city, time range)
Given the user has done a previous search for events in the app
When the user the user goes offline, changes a setting (city, time) and checks their app
Then the user will get an error message stating it “cannot load new data without connection”

User Story 5:
As a user, I should be able to see a chart with event data so that I can see an overview of event activity in a particular city.

FEATURE 5: DATA VISUALIZATION
Scenario 1: Show a chart with the number of upcoming events in each city
Given the user has searched by a city
When the user clicks on “chart” option
Then the user should see a chart displaying all events in the selected city over periods of time (ie; monthly)
