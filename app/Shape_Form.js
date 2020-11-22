import React from 'react'

export default class ShapeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      siteLength: props.siteLength,
      siteWidth: props.siteWidth,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: Number(event.target.value)
    })
    //this.props.onChange(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
      this.props.onShapeChange(this.state)
  }

  render() {
    //const state = this.state
    const siteLength = this.state.siteLength
    const siteWidth = this.state.siteWidth
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="siteLength">
              {' '}
              Site Length:{' '}
              <span className={siteLength ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="siteLength"
              type="number"
              value={siteLength}
            />
            <label htmlFor="siteWidth">
              {' '}
              Site Width:{' '}
              <span className={siteWidth ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="siteWidth"
              type="number"
              value={siteWidth}
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

