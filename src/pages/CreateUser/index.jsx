import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from './components/Form';

export default class CreateUser extends Component {
  render() {
    const { history } = this.props;
    return (
      <Form history={ history } />
    );
  }
}

CreateUser.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
