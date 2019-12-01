import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    children,
    onClick,
  } = props;
  return (
    <button
      type="button"
      className="btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Button;
