import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken } from './api';
import './nprogress.css';
import Login from './Login';


class App extends Component {
  constructor() {
    super()
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 12,
      currentLocation: 'all',
      tokenCheck: false
    }
  }

  updateEvents = (location, eventCount) => {
    const {currentLocation, numberOfEvents} = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = 
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = 
          currentLocation === 'all'
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount
        });
      });
    }
  }

  async componentDidMount() {
    // google verification PDF task
    const accessToken = localStorage.getItem('access_token');
    const validToken = accessToken !== null 
      ? await checkToken(accessToken)
      : false;
    this.setState({ tokenCheck: validToken });
    if(validToken === true) 
      this.updateEvents();
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
    this.mounted = true;
    if (code && this.mounted === true && validToken === false){
      this.setState({ tokenCheck: true });
      this.updateEvents()
    }


    this.mounted = true;
    getEvents().then((events) => {
      if(this.mounted) {
      this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let {tokenCheck} = this.state;

    return {tokenCheck} === false ? (
      <div className="App">
        <Login />
      </div>
    ) : (
      <div className='App'>
        <Navbar variant='dark'  expand='sm' fixed='top' className='color-nav'>
          <Navbar.Brand className='brand' href='https://ksflynn007.github.io/meet-app/'>
            Code Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse>
            <Nav >
              <p className='header-welcome'>Welcome to the Code Hub, please select from a city below to find an event:</p>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents}
          />
        <NumberOfEvents 
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
          />
        <EventList events={this.state.events}/>
      </div>
    )
  };
}

export default App;
