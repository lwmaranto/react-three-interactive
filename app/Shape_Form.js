import React from "react";

export default class ShapeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeLength: props.shapeLength,
      shapeWidth: props.shapeWidth,
      shapeHeight: props.shapeHeight,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: Number(event.target.value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onShapeChange(this.state);
  }

  render() {
    const shapeLength = this.state.shapeLength;
    const shapeWidth = this.state.shapeWidth;
    const shapeHeight = this.state.shapeHeight;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="shapeLength">
              {" "}
              Shape Length:{" "}
              <span className={shapeLength ? "" : "warning"}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="shapeLength"
              type="number"
              min="1"
              value={shapeLength}
            />
            <label htmlFor="shapeWidth">
              {" "}
              Shape Width:{" "}
              <span className={shapeWidth ? "" : "warning"}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="shapeWidth"
              type="number"
              min="1"
              value={shapeWidth}
            />
            <label htmlFor="shapeHeight">
              {" "}
              Shape Height:{" "}
              <span className={shapeHeight ? "" : "warning"}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="shapeHeight"
              type="number"
              min="1"
              value={shapeHeight}
            />
            <button className="button" type="submit">
              Resize Me!
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
