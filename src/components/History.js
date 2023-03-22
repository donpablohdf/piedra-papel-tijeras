import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

function History({ history }) {
  return (
    <div>
      <h2>Historial</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tu elección</th>
            <th>Elección del oponente</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.playerChoice}</td>
              <td>{item.computerChoice}</td>
              <td>{item.result}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      playerChoice: PropTypes.string.isRequired,
      computerChoice: PropTypes.string.isRequired,
      result: PropTypes.oneOf(['ganas', 'pierdes', 'empate']).isRequired
    })
  ).isRequired
};

export default History;
