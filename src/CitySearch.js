import React, { Component } from 'react';
import {InfoAlert} from './Alert';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({showSuggestions: true});
    // using this.props.location because we're passing it from App component later
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We cannot find the city you are looking for, please try another city.'
      });
    } else {
      return this.setState({
        query:value,
        suggestions: [],
        showSuggestions: false
        infoText: ''
      });
    }
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });
    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className='CitySearch'>
        <InfoAlert text={this.state.infoText}/>

        <input 
        type='text' 
        className='city' 
        value={this.state.query} 
        onChange={this.handleInputChanged}
        onFocus={() => { this.setState({ showSuggestions: true})}}
        />

{/* if showSuggestions is true, list is visable, style won't have display: none, so list won't become visible */}
        <ul className='suggestions' style={this.state.showSuggestions ? {}: {display: 'none'}}>
          {this.state.suggestions.map((suggestion) => (
            <li 
            key={suggestion}
            onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;