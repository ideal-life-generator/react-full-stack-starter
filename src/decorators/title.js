import React, { Component } from 'react' ;
import store from '../store';
import { updateTitle, setDefaultTitle } from '../reducers/title';

export default function title(text) {
  return (Element) => {
    return class Title extends Component {
      componentDidMount() {
        store.dispatch(updateTitle(text));
      }

      componentWillUnmount() {;
        store.dispatch(setDefaultTitle());
      }

      render() {
        const { props, props: { children } } = this;

        return (
          <Element {...props}>{children}</Element>
        );
      }
    }
  };
}
