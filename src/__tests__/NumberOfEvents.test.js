import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    let NumberWrapper;
    beforeAll(() => {
        NumberWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
    });

    test('renders NumberofEvents component', () => {
        expect(NumberWrapper).toHaveLength(1);
    })

    test('renders numberOfEvents element', () => {
        expect(NumberWrapper.find('.numberOfEvents')).toHaveLength(1);
    })

    test('renders number change label', () => {
        expect(NumberWrapper.find('.eventNumberLabel')).toHaveLength(1);
    })

    test('renders number change input field', () => {
        expect(NumberWrapper.find('.eventNumber')).toHaveLength(1);
    })

    test('renders default number (12) input correctly', () => {
        const eventNumber = NumberWrapper.state('eventNumber');
        expect(NumberWrapper.find('.eventNumber').prop('value')).toBe(eventNumber);
    })

    test('render entering new number/page value changes state', () => {
        NumberWrapper.setState({eventNumber: '12'});
        // target is what's entered into input
        const newNumber = { target: {value: 6}};
        NumberWrapper.find('.eventNumber').simulate('change', newNumber);
        expect(NumberWrapper.state('eventNumber')).toBe(6);
    })
})