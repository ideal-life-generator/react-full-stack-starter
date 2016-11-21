import React, { Component } from 'react' ;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { title } from '../decorators';

@title('Users')

export default class Users extends Component {
  render() {
    return (
      <div>Users</div>
    );
  }
}
