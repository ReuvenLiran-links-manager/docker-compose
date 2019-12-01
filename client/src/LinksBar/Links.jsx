import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Button,
} from '../components';

const Links = (props) => {
  const {
    links,
    onClick,
  } = props;
  return (
    <List>
      {links.map(link => (
        <li key={link.id}>
          <Button
            onClick={() => {
              onClick(link.url);
              console.log(link.url);
            }}
          >
            {link.description}
          </Button>
        </li>
      ))}
    </List>
  );
};

Links.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Links;
