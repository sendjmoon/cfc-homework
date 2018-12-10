import React from 'react'
import './Search.css'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      options: require('./options.json'),
      results: [],
      selection: {},
      showNotification: false,
      showResults: false
    }

    this.findMatch = this.findMatch.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  findMatch(array, string) {
    return array.filter(option => (
      option.label.toUpperCase().startsWith(string.toUpperCase())
    ))
  }

  // This is my brute force approach to finding matches. It runs through
  // the options array when input is detected (except when the input
  // value is changed to empty). This could be optimized by running
  // through the results array when input.length is > 1. However, one edge
  // case is what if a user backspaces on their input? How would we store
  // data for different states of the results? Possibly nest arrays? Or,
  // if the user backspaces would we run through the options array again?
  handleInput(e) {
    if (e.target.value.length < 1) {
      this.setState({
        inputValue: '',
        results: [],
        showResults: false
      })
    }

    else {
      this.setState({
        inputValue: e.target.value,
        results: this.findMatch(this.state.options, e.target.value),
        showResults: true
      })
    }
  }

  handleSelect(e) {
    const selectionData = {
      label: e.target.getAttribute('data-label'),
      value: e.target.getAttribute('data-value')
    }

    this.setState({
      inputValue: '',
      results: [],
      selection: selectionData,
      showNotification: true,
      showResults: false
    })
  }

  // I used this to meet the requirement of selecting a match by pressing
  // Enter. The user can tab or shift + tab to navigate down or up the list.
  // I think a better experience would be to allow users to navigate
  // the list using the arrow keys or hover over the item they wish to
  // select and press Enter.
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.results.length > 0) {
      const selectionData = {
        label: this.state.results[0].label,
        value: this.state.results[0].value
      }

      this.setState({
        inputValue: '',
        selection: selectionData,
        showNotification: true,
        showResults: false
      })
    }
  }

  render() {
    let selectionString =
      `${this.state.selection.label} ${this.state.selection.value}`

    // This is a sprawled out version of the HTML to render. Ideally, this
    // would be compartmentalized into separate components to handle
    // different parts of the application.
    return (
      <div className="search-container">
        <div className="notification-container">
          {this.state.showNotification &&
            <p>You made a selection!</p>
          }
        </div>
        <form autocomplete="off" onSubmit={this.handleSubmit}>
          <div className="input-container">
            <input
              id="search-input"
              onChange={this.handleInput}
              value={this.state.inputValue}
            />
            {this.state.showNotification &&
              <p className="select-text">{selectionString}</p>
            }
          </div>
          {this.state.showResults &&
            <div className="results-list">
              {this.state.results.map((result, index) => (
                <button
                  className="result"
                  data-label={result.label}
                  data-value={result.value}
                  key={index}
                  onClick={this.handleSelect}
                >
                  {result.label}
                </button>
              ))}
            </div>
          }
        </form>
      </div>
    )
  }
}
