import React from "react";
import Question from "./components/Question";

const App = () => {
  const start = async () => {};

  const checkAnswer = (e) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>TodosTruchos</h1>
      <p>T_T</p>
      <button onClick={start}>Jugar</button>
      <p>Puntuación:</p>
      <p>Cargando...</p>
      <Question/>
      <button onClick={nextQuestion}>siguiente</button>
    </div>
  );
};

export default App;
