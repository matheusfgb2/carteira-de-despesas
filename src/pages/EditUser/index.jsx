import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { UserForm } from './components';

export default class CreateUser extends Component {
  state = {
    isEditUser: false,
    userId: '',
  };

  componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const isEditUser = pathname.includes('editar-usuario');
    const userId = isEditUser ? pathname.split('/')[2] : '';
    this.setState({ isEditUser, userId });
  }

  render() {
    const { isEditUser, userId } = this.state;
    const { history } = this.props;
    return (
      <div className="user-page">
        <UserForm history={ history } isEditUser={ isEditUser } userId={ userId } />
      </div>
    );
  }
}

CreateUser.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
