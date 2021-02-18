import React from 'react';
import {shallow} from 'enzyme';
import Event from '../Event';
import {mockData} from '../mock-data';

describe('<Event /> component', () => {

    let EventWrapper
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData}/>);
    })

    test('render Event component', () => {
        expect(EventWrapper).toHaveLength(1);
    });

    test('render event element', () => {
        expect(EventWrapper.find('.Event')).toHaveLength(1);
    })

    test('render collapsed view div', () => {
        expect(EventWrapper.find('.event-collapsed')).toHaveLength(1);
    })

    // collapsed view details:
    test('render contents of collapsed view', () => {
        // 3 children because button is included!
        expect(EventWrapper.find('.event-collapsed').children()).toHaveLength(3);
    })

    test('render show/hide button', () => {
        expect(EventWrapper.find('.details-btn')).toHaveLength(1);
    })

    // checking that state changed at all
    test('render expanded view of event when button is clicked', () => {
        EventWrapper.setState({ showDetails: false})
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
    })

    // checks that once state has changed to true, it shows the entire div
    test('render expanded view div', () => {
        EventWrapper.setState({ showDetails: false})
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.find('.event-expanded')).toHaveLength(1);
    })

    // checks that once state has changed to true, it shows the details
    test('render expanded view contents', () => {
        EventWrapper.setState({ showDetails: false})
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.find('.event-expanded').children()).toHaveLength(4);
    })

    test('render view toggled back to collapsed event when hide button clicked', () => {
        EventWrapper.setState({ showDetailed: true})
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(false);
        })



})