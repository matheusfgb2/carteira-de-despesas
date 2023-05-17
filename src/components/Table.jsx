import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableElementCard from './TableElementCard';
import './Table.css';
import { expensesPropTypes } from '../types';

const tableHeaderContent = [
  'Descrição', 'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];
class Table extends Component {
  render() {
    const { expenses, isLoading } = this.props;
    return (
      <div className="expenses-table-component">
        <div className="expenses-table-div">
          {isLoading ? <h2 className="loading">Loading...</h2> : (
            <table className="expenses-table">
              <thead>
                <tr>
                  {tableHeaderContent.map((header) => (
                    <th key={ Math.random() }>
                      {header}
                    </th>))}
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr key={ Math.random() }>
                    <TableElementCard expense={ expense } />
                  </tr>))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: expensesPropTypes.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  isLoading: wallet.isFetching,
});

export default connect(mapStateToProps)(Table);
