import React, { Component } from 'react' ;
import classes from '../styles/common.scss';
import reactIcon from '../images/react-icons.svg';

export default class Main extends Component {
  static title = 'Main';

  render() {
    return (
      <section className={classes.main}>
        <img className={classes.mainImage} src={reactIcon} />
        <h1>Welcome to the React Starter Kit.</h1>
      </section>
    );
  }
}
