import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Button = ({ mode = 'primary', label, classNames = '', ...props }) => {
  return (
    <button className={`marquee-button marquee-button--${mode} ${classNames}`} aria-label={label} {...props}>
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * What type of button is this. Default is primary.
   */
  mode: PropTypes.oneOf(['primary', 'red', 'blue']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

// Button.defaultProps = {
//   //   backgroundColor: null,
//   mode: 'primary',
//   //   size: 'medium',
//   onClick: undefined,
// };

export default Button;
