import React, { Component } from 'react' ;
import MainIcon from '../components/MainIcon';
import { primary1Color } from '../theme';
import classes from '../styles/home.scss';

export default class Home extends Component {
  static title = 'Home';

  render() {
    return (
      <section className={classes.main}>
        <div className={classes.greeting}>
        <MainIcon className={classes.icon} color={primary1Color} />
          <h1>Welcome to the React Full Stack Starter</h1>
        </div>
      </section>
    );
  }
}
