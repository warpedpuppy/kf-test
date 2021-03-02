import React, {Component} from 'react';
import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {

    state = {
        // default number of events
        eventNumber: 12,
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.props.updateEvents(null, value);
        if (value < 1 ){
            this.setState({
                eventNumber: value,
                errorText: 'Please choose at least one event to view.'
            });
        } else {
            return this.setState({
                eventNumber: value,
                errorText: ''
            });
        } 
    }


    render() {
        return(
            <div className='numberOfEvents'>
                <ErrorAlert text={this.state.errorText} style={{margin: 0}}/>

                <label className='eventNumberLabel'>Number of events/page:</label>
                <input
                type='number'
                id='eventNumber'
                className='eventNumber'
                value={this.state.eventNumber}
                onChange={this.handleInputChanged}
                />

            </div>
        )
    }
}

export default NumberOfEvents;