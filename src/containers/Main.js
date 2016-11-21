import React, { Component } from 'react' ;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class Main extends Component {
  static title = 'Main';

  render() {
    return (
      <h1>Welcome to the React Starter Kit</h1>
    );
  }
}
