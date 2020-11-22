import React from 'react'

export default class ShapeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      siteLength: 0,
      siteWidth: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
      this.setState({
        siteLength: this.state.siteLength,
        siteWidth: this.state.siteWidth
      })
  }

  render() {
    const state = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="siteLength">
              {' '}
              Site Length:{' '}
              <span className={state.siteLenth ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="siteLength"
              type="number"
              value={state.siteLength}
            />
            <label htmlFor="siteWidth">
              {' '}
              Site Width:{' '}
              <span className={state.siteWidth ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="siteWidth"
              type="number"
              value={state.siteWidth}
            />
            <button
              className="button"
              type="submit"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
}

