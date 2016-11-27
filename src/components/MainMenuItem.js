import React, { Component } from 'react' ;
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

export default function MainMenuItem({ to, description, ...props }) {
  return (
    <MenuItem {...props} containerElement={<Link to={to} />}>
      {description}
    </MenuItem>
  );
}
