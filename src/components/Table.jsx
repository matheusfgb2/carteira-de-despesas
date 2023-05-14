import React, { Component } from 'react';
import './Table.css';

const tableContent = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

class Table extends Component {
  render() {
    return (
      <div className="table-component">

        <table className="table-content">
          {tableContent.map((header, index) => (
            <th
              key={ header }
              className={ index === 0 ? 'first-th' : 'remaining-th' }
            >
              {header}

            </th>
          ))}
        </table>

      </div>
    );
  }
}

export default Table;
