import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./App.css"
import Score from './components/Score';
import History from './components/History';
import ResetButton from './components/ResetButton';
import { getComputerChoice, getGameResult, getPlayerChoice, storeScoreAPI } from './service/utils';


function App() {
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const computerChoice = await getComputerChoice();
    const playerChoice = getPlayerChoice();
    const result = getGameResult(playerChoice, computerChoice);
    //actualizar resultados
    const newScore = {
      player: score.player + (result === 'ganas' ? 1 : 0),
      computer: score.computer + (result === 'pierdes' ? 1 : 0),
      ties: score.ties + (result === 'empate' ? 1 : 0)
    };
    setScore(newScore);

    // Guardar hstory en API
    const dataHistory = {
      playerChoice,
      computerChoice,
      result
    };
    const newHistory = await storeScoreAPI(dataHistory)
    setHistory(newHistory);


    setMessage(`Tu ${result}! Tu eleccion ${playerChoice} y la del ordenador ${computerChoice}.`);
  };

  const handleReset = () => {
    setScore({ player: 0, computer: 0, ties: 0 });
    setHistory([]);
    setMessage('');
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Piedra, Papel o Tijeras</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <button className="play-button" onClick={handleClick} >
            Jugar
          </button>

        </Col>
      </Row>
      <Row>
        <Col>
          <Score score={score} />
        </Col>
      </Row>
      <Row>
        <Col>
          <History history={history} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ResetButton onReset={handleReset} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{message}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
