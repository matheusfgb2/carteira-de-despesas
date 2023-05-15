import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableElementCard from './TableElementCard';
import './Table.css';

const tableHeaderContent = [
  'Descrição', 'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];
class Table extends Component {
  // // Função para distribuir a tabela de despesas com elementos vazios
  // //
  // getExpensesWithEmptyElements = () => {
  //   const { expenses } = this.props;
  //   const emptyDefaultQuantity = 6;
  //   const currentEmptyQuantity = Math.max(0, emptyDefaultQuantity - expenses.length);

  //   let expensesCopy = [...expenses];

  //   for (let index = 0; index < currentEmptyQuantity; index += 1) {
  //     expensesCopy = [...expensesCopy, null];
  //   }

  //   return expensesCopy;
  // };

  render() {
    const { expenses, isLoading } = this.props;
    // const expensesWithEmptyElements = this.getExpensesWithEmptyElements();
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
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {expenses.map((expense) => (
                  <tr key={ Math.random() }>
                    <TableElementCard expense={ expense } />
                  </tr>
                ))}

              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  isLoading: wallet.isFetchingER,
});

export default connect(mapStateToProps)(Table);
