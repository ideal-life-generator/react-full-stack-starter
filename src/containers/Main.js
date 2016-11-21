import React, { Component } from 'react' ;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { title } from '../decorators';

@title('Main')

export default class Main extends Component {
  render() {
    return (
      <div>Welcome to the React Starter Kit</div>
    );
  }
}
