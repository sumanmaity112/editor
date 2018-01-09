import React, { PropTypes } from 'react';

const Spinner = (props) => {
  if (props.show) {
    return (<div className="overlay"/>);
  }
  return null;
};

Spinner.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Spinner;
