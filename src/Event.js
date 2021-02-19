import React, {Component} from 'react';
import moment from 'moment';

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

    formatStartTime = () => {
        const time = this.props.event.start.dateTime;
        const formattedStartTime = moment(time).format('dddd, MMMM, Do YYYY, h:MM a');
        return <span className='start-dateTime'>{`${formattedStartTime}`}</span>
    }

    formatEndTime = () => {
        const time = this.props.event.end.dateTime;
        const formattedEndTime = moment(time).format('dddd, MMMM, Do YYYY, h:MM a');
        return <span className='start-dateTime'>{`${formattedEndTime}`}</span>
    }

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
                        <p className='event-start'><span class='time-label'>Starts @ </span>{this.formatStartTime()}</p>
                        <p className='event-end'><span class='time-label'>Ends @ </span>{this.formatEndTime()}</p>
                        <p className='event-description'>{event.description}</p>
                        <p className='event-organizer'>Get in touch with us about this event at: <span class='org-email'>{event.organizer.email}</span></p>

                    </div>
                )}

            </div>
        )
    }
};

export default Event;
