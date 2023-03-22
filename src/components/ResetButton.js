import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';


function ResetButton(props) {
  const handleReset = async () => {
    props.onReset();
    try {
      const response = await axios.post('http://localhost:3001/reset');
      return response.data;
  } catch (error) {
      console.log(error);
  }
  };

  return (
    <Button variant="secondary" onClick={handleReset}>Reiniciar</Button>
  );
}

export default ResetButton;
