import React, { Component, PropTypes } from 'react' ;
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux' ;
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { load as loadUsers } from '../reducers/users';
import styles from '../styles/users.scss';

const { bool, string, func, arrayOf, shape } = PropTypes;

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(loadUsers()),
}])

@connect(({ users }) => users, dispatch => bindActionCreators({ load: loadUsers }, dispatch))

export default class Users extends Component {
  static propTypes = {
    collection: arrayOf(shape({
      _id: string.isRequired,
      name: string.isRequired,
      feedback: string,
    }).isRequired).isRequired,
    load: func.isRequired,
    isFetched: bool.isRequired,
    isFailure: bool.isRequired,
    error: shape({
      message: string,
    }).isRequired,
  };

  render() {
    const { props: { load, collection, isFetched, isFailure, error: { message } } } = this;

    return (
      <div>
        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn className={styles.name}>Name</TableHeaderColumn>
              <TableHeaderColumn>feedback</TableHeaderColumn>
              <TableHeaderColumn className={styles.button}>
                <RefreshIndicator
                  percentage={100}
                  size={35}
                  left={100}
                  top={11}
                  status={isFetched ? 'loading' : 'ready'}
                  onTouchTap={load}
                />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collection.map(({ _id, name, feedback }) => (
              <TableRow key={_id}>
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
