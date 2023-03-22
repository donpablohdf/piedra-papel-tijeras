import React from 'react';
import { Card } from 'react-bootstrap';

function Score({ score }) {
  return (
    <Card>
      <Card.Header>Puntuación</Card.Header>
      <Card.Body>
        <p>Tu: {score.player}</p>
        <p>Ordenador: {score.computer}</p>
        <p>Empates: {score.ties}</p>
      </Card.Body>
    </Card>
  );
}

export default Score;
