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
  render() {
    const { expenses } = this.props;

    return (
      <div className="expenses-table-component">
        <div className="expenses-table-div">
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

        </div>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
