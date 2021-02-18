import React, {Component} from 'react';

class Event extends Component {
    state = {
        showDetails: false
    };

    // toggle button function
    handleShowDetails = () => {
        if(this.state.showDetails === false){
            this.setState({ showDetails: true});
        } else {
            this.setState({ showDetails: false})
        }
    };

    render() {
        const showDetails = this.state.showDetails;
        // passed event from Event.test.js as prop event={mockData}, no need to import it again in this component
        const {event} = this.props;

        return(
            <div className='Event'>
                <div className='event-collapsed'>
                    <h3 className='event-name'>{event.summary}</h3>
                    <p className='event-location'>{event.location}</p>
                    {!showDetails && (
                        <button className='details-btn' onClick={this.handleShowDetails}>
                            Expand This Event
                        </button>
                    )}
                    {showDetails && (
                        <button className='details-btn' onClick={this.handleShowDetails}>
                            Collapse This Event
                        </button>
                    )}
                </div>
                
                {showDetails && (
                    <div className='event-expanded'>
                        <p className='event-start'>{event.start.dateTime}</p>
                        <p className='event-end'>{event.end.dateTime}</p>
                        <p className='event-description'>{event.description}</p>
                        <p className='event-organizer'>Get in touch with us about this event at: {event.organizer.email}</p>

                    </div>
                )}

            </div>
        )
    }
};

export default Event;
