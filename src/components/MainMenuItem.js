import React, { PropTypes } from 'react' ;
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

const { string } = PropTypes;

export default function MainMenuItem({ to, description, ...props }) {
  return (
    <MenuItem
      {...props}
      containerElement={<Link to={to} />}
    >
      {description}
    </MenuItem>
  );
}

MainMenuItem.propTypes = {
  to: string.isRequired,
  description: string.isRequired,
};
