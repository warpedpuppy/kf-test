import React from 'react';
// no shallow in this one, need children components from App, like Events
import { mount } from 'enzyme';
import App from '../App';
import {mockData} from '../mock-data';

import {loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppWrapper;
        given('the user has entered in (or left empty) search constraints', () => {
            // aka the app has loaded
            // use mount/shallow in the "given" part only
            AppWrapper = mount(<App />);
        });

        when('the user loads a list of events in that search', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
        });

        then('the user should see the events in collapsed form (ie; name and city only)', () => {
            // could also use state "showDetails" as that's the condition of the if/else return in Events to have 0.length
            expect(AppWrapper.find('.event-expanded')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppWrapper;
        given('the user has loaded a list of upcoming events', () => {
            AppWrapper = mount(<App/>)
        });

        when('the user clicks on “See More" for one event in the list', () => {
            AppWrapper.update();
            // no expect, we just want to simulate the action, we aren't checking for result yet
            AppWrapper.find('.details-btn').at(0).simulate('click');
        });

        then('the user should see all details relating to that one event in a larger window/area', () => {
            // just 1, as we're testing out ONE example of clicking ONE event
            expect(AppWrapper.find('.event-expanded')).toHaveLength(1);

        });
    });

    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        let AppWrapper;            
        given('the user has loaded a list of events/opened app', () => {
            AppWrapper = mount(<App />);
        });

        and('the user has already opened up an expanded view of an event', () => {
            AppWrapper.update();
            AppWrapper.find('.details-btn').at(0).simulate('click');
            expect(AppWrapper.find('.event-expanded')).toHaveLength(1);
        });

        when('the user clicks on “See Less"', () => {
            AppWrapper.find('.details-btn').at(0).simulate('click');
        });

        then('the user should go back to a collapsed view of the event in the list of all events from their search', () => {
            // can't use .event-collapsed, because collapsed info is ALWAYS present
            expect(AppWrapper.find('.event-expanded')).toHaveLength(0)
        });
    });
});