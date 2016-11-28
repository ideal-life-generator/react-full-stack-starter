import React, { Component } from 'react' ;
import MainIcon from '../components/MainIcon';
import { primary1Color } from '../theme';
import styles from '../styles/home.scss';

export default class Home extends Component {
  static title = 'Home';

  render() {
    return (
      <section className={styles.main}>
        <div className={styles.greeting}>
          <MainIcon className={styles.icon} color={primary1Color} />
          <h1>Welcome to the React Full Stack Starter</h1>
        </div>
      </section>
    );
  }
}
