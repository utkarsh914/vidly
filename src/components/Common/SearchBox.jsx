import React, { Component } from "react";

class SearchBox extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div className="form-group">
        <input
          type="text"
          name="searchBox"
          id="searchBox"
          placeholder="Search..."
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    );
  }
}

export default SearchBox;
