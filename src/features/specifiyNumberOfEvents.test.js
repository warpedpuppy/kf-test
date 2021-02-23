import React from 'react';
import {mount} from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

import {loadFeature, defineFeature} from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user hasn’t specified a number, 12 is the default number', ({ given, when, then }) => {
        let AppWrapper;
        given('the user has selected their search constraints (or left them null) for events', () => {});

        when('the user loads their events list without changing any default settings', () => {
            AppWrapper = mount(<App />);
        });

        then(/^the user will see no more than (\d+) events at a time in the list$/, (arg0) => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event').length).toBeLessThanOrEqual(12);

        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper, NumberOfEventsWrapper
        given('the user has selected their search constraints (or left them null) for events', () => {
            AppWrapper = mount(<App />);
        });

        when('the user changes the settings for number of events listed from the default to “x”', () => {
            AppWrapper.update();
            const numberOfEvents = {target: { value: 4}}
            AppWrapper.find('.eventNumber').simulate('change', numberOfEvents );
        });

        then('the user will see no more than “x” amount of events at a time in the list', () => {
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('eventNumber')).toBe(4);
        });
    });

});