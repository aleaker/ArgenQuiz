import React, { useState } from "react";
import Question from "./components/Question";
import Starter from "./components/Starter";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [amount, setAmount] = useState(3);

  const start = async () => {
    const newQuestions = await fetchQuestions(4);
    setQuestions(newQuestions);
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e) => {
    console.log(e.target.value);
    if (!gameOver) {
      const answer = e.target.value;
      const correct = questions[number].politicianId === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      setUserAnswers(prev=>[...prev,answer])
      console.log(userAnswers)
    }
  };

  const nextQuestion = () => {
    setNumber(prev=>prev+1)
  };

  const politiciansNames = [
    "Maruicio Macri",
    "Lilita Carrio",
    "Cristina Kirchner",
    "Nestor Kirchner",
    "Guillermo Moreno",
  ];

  const getPoliticiansNames = (arr, answ) => {
    let answArr = arr.map((index) => politiciansNames[index]);
    answArr.push(answ);
    return answArr;
  };

  const fetchQuestions = async (amount) => {
    const api = `https://b9ktant6bd.execute-api.sa-east-1.amazonaws.com/dev/questions?amount=${amount}`;
    const questionsArr = await (await fetch(api)).json(); //awaits for response and then for it to be parsed
    return questionsArr.map((question) => ({
      //spreeds the fakesArray, gets the politicians names for each index and adds the correct answer to that array
      ...question,
      answersArr: getPoliticiansNames(
        question.fakesArray,
        question.politicianId
      ),
    }));
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
    console.log(amount);
  };

  return (
    <div className="App">
      <h1>TodosTruchos</h1>
      <p>T_T</p>
      {gameOver && <Starter start={start} handleChange={handleChange} />}
      {!gameOver && <p>Puntuación: {score}</p>}
      {loading && <p>Cargando...</p>}
      {!loading && !gameOver && (
        <Question
          amount={amount}
          questionNumber={number + 1}
          text={questions[number].text}
          answersArr={questions[number].answersArr}  //combination of fakes and correct answer
          userAnswers={userAnswers ? userAnswers[number] : undefined}
          checkAnswer={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== amount - 1 ? (
        <button onClick={nextQuestion}>siguiente</button>
      ) : null}
    </div>
  );
};

export default App;
