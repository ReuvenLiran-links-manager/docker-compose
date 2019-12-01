import React from 'react';
import PropTypes from 'prop-types';

const Iframe = (props) => {
  const {
    src,
  } = props;
  return (
    <iframe
      id="sss"
      title={src}
      src="https://www.google.com"
    />
  );
};

Iframe.propTypes = {
  src: PropTypes.string,
};

Iframe.defaultProps = {
  src: '',
};

export default Iframe;
