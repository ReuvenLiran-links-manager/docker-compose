import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  const {
    children,
  } = props;
  return (
    <ul>
      {children}
    </ul>
  );
};

List.propTypes = {
  children: PropTypes.node.isRequired,
};
export default List;
