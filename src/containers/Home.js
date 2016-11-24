import React, { Component } from 'react' ;
import classes from '../styles/common.scss';
import reactIcon from '../images/react-icons.svg';

export default class Home extends Component {
  static title = 'Home';

  render() {
    return (
      <section className={classes.main}>
        <div className={classes.greeting}>
          <img className={classes.mainImage} src={reactIcon} />
          <h1>Welcome to the React Starter Kit.</h1>
        </div>
      </section>
    );
  }
}
