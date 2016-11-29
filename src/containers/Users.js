import React, { Component, PropTypes } from 'react' ;
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux' ;
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import * as usersActions from '../reducers/users';
import styles from '../styles/users.scss';

const { bool, number, string, func, arrayOf, shape } = PropTypes;

@asyncConnect([{
  promise({ store: { dispatch } }) {
    return dispatch(usersActions.load());
  },
}])

@connect(({ users }) => users, dispatch => bindActionCreators(usersActions, dispatch))

export default class Users extends Component {
  static title = 'Users';

  static propTypes = {
    collection: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
      feedback: string,
    }).isRequired).isRequired,
    load: func.isRequired,
    isFailure: bool.isRequired,
    error: shape({
      message: string,
    }).isRequired,
  };

  render() {
    const { props: { load, collection, isFailure, error: { message } } } = this;

    return (
      <div>
        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn className={styles.id}>ID</TableHeaderColumn>
              <TableHeaderColumn className={styles.name}>Name</TableHeaderColumn>
              <TableHeaderColumn>Feedback</TableHeaderColumn>
              <TableHeaderColumn className={styles.button}>
                <RaisedButton label="Refresh" onTouchTap={load} />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collection.map(({ id, name, feedback }) => (
              <TableRow key={id}>
                <TableRowColumn className={styles.id}>{id}</TableRowColumn>
                <TableRowColumn className={styles.name}>{name}</TableRowColumn>
                <TableRowColumn>{feedback}</TableRowColumn>
                <TableRowColumn className={styles.button}>
                  <RaisedButton label="Remove" />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbar
          className={styles.errorBox}
          open={isFailure}
          message={message || ''}
          autoHideDuration={5000}
        />
      </div>
    );
  }
}
