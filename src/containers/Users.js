import React, { Component } from 'react' ;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux' ;
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { pink500, black500 } from 'material-ui/styles/colors';
import VerifiedIcon from '../components/VerifiedIcon';
import { load } from '../modules/users';
import styles from '../styles/users.scss';

@connect(({ users }) => users, (dispatch) => bindActionCreators({ load }, dispatch))

export default class Users extends Component {
  static title = 'Users';

  componentDidMount() {
    const { props: { collection, load } } = this;

    load();
  }

  render() {
    const { props: { load, collection, isFetched, isFailure, error: { message } } } = this;

    return (
      <div>
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn className={styles.id}>ID</TableHeaderColumn>
              <TableHeaderColumn className={styles.name}>Name</TableHeaderColumn>
              <TableHeaderColumn>Feedback</TableHeaderColumn>
              <TableHeaderColumn className={styles.verified}>Verified</TableHeaderColumn>
              <TableHeaderColumn className={styles.button}>
                <RaisedButton label="Refresh" onTouchTap={load} />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collection.map(({ id, name, feedback, verified }) => (
              <TableRow key={id}>
                <TableRowColumn className={styles.id}>{id}</TableRowColumn>
                <TableRowColumn className={styles.name}>{name}</TableRowColumn>
                <TableRowColumn>{feedback}</TableRowColumn>
                <TableRowColumn className={styles.verified}>
                  <VerifiedIcon color={verified ? pink500 : black500} />
                </TableRowColumn>
                <TableRowColumn className={styles.button}>...</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbar
          className={styles.errorBox}
          open={isFailure}
          message={<span style={{ color: pink500 }}>{message || ''}</span>}
          autoHideDuration={5000}
        />
      </div>
    );
  }
}
