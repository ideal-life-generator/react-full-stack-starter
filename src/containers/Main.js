import React, { Component } from 'react' ;
import classes from '../styles/common.scss';

export default class Main extends Component {
  static title = 'Main';

  render() {
    return (
      <section className={classes.main}>
        <h1>Welcome to the React Starter Kit.</h1>
      </section>
    );
  }
}
