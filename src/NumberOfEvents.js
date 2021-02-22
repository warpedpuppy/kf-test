import React, {Component} from 'react';

class NumberOfEvents extends Component {

    state = {
        // default number of events
        eventNumber: 12,
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.props.updateEvents(null, value);
        this.setState({
            eventNumber: value
        })    
    }


    render() {
        return(
            <div className='numberOfEvents'>

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