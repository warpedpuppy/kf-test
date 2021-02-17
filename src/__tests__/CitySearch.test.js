import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import {mockData} from '../mock-data';
import {extractLocations} from '../api';

describe('<CitySearch /> component', () => {

    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations}/>);
    });

    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    test('renders a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change state when text input changes', () => {
        CitySearchWrapper.setState({
            query:'Munich'
        });
        // tells query state to change its value to Berlin once change event is called:
        const eventObject = {target: {value: 'Berlin'}};
        // .simulate() takes two params
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
        // when event like 'click' or 'change' takes place, handler function receives object with id event as one of arguments.
    });

    test('render list of suggestions correctly', () => {
        CitySearchWrapper.setState({suggestions:locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });

    test('suggestion list matches the query when changed', () => {
        CitySearchWrapper.setState({query: '', suggestions: []});
        CitySearchWrapper.find('.city').simulate('change', {
            target: { value: 'Berlin'},
        });
        const query = CitySearchWrapper.state('query');
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        })
        // toEqual() used instead of toBe() because we're comparing complex data types vs. simple!
        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });
});