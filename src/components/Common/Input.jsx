import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        placeholder={`Enter ${name}`}
        className="form-control"
      />
      {error && (
        <div className="invalid-feedbackk alert alert-danger">{error}</div>
      )}
    </div>
  );
};

export default Input;
