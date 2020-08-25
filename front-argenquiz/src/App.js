import React, { useState } from "react";
import Question from "./components/Question";
import Starter from "./components/Starter";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [amount, setAmount] = useState(7);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState();
  const [isPressed, setIsPressed] = useState(false);

  const start = async () => {
    setIsPressed(true);
    setLoading(true);
    const newQuestions = await fetchQuestions(amount);
    setQuestions(newQuestions);
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setHasAnswered(false);
    setQuestionNumber(0);
    setLoading(false);
    setIsPressed(false);
  };

  const checkAnswer = (e) => {
    if (!gameOver) {
      const answer = e.target.value;
      const correct = questions[questionNumber].politicianId === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      setUserAnswers((prev) => [...prev, answer]);
      if (userAnswers.length >= questionNumber) {
        setHasAnswered(true);
      }
    }
  };

  const nextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    setHasAnswered(false);
  };

  const politiciansNames = ["Macri", "Carrio", "cfk", "Kirchner", "Moreno"];

  const getPoliticiansNames = (arr, answ) => {
    let answArr = arr.map((index) => politiciansNames[index]);
    answArr.push(answ);
    return answArr;
  };

  const fetchQuestions = async (amount) => {
    const api = `https://b9ktant6bd.execute-api.sa-east-1.amazonaws.com/dev/questions?amount=${amount}`;
    const questionsArr = await (await fetch(api)).json(); //awaits for response and then for it to be parsed
    console.log(questionsArr);
    setTotalQuestions(questionsArr.length);

    setAmount(questionsArr.length);

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
  };
  console.log(amount);
  return (
    <div className="App">
      <div className="leftContainer">
        <img
          className="fort"
          src={
            "https://64.media.tumblr.com/872ec93cfbff2554cc4dbe84e27fc64b/tumblr_p3cofgka9h1wyvojio1_1280.gifv"
          }
        />
      </div>

      <div className="centerContainer">
        <div className="titleContainer">
          <h1>TodosTruchos</h1>
        </div>
        <p>T_T</p>
        {gameOver && (
          <div className="introContainer">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit
            </p>
          </div>
        )}
        {/* ------------------start-------------------- */}
        {(gameOver || userAnswers.length === totalQuestions) && (
          <Starter
            start={start}
            handleChange={handleChange}
            isPressed={isPressed}
          />
        )}
        {/* ------------------data-------------------- */}
        {!gameOver && <p>Puntuación: {score}</p>}
        {loading && <p>Cargando...</p>}
        {/* ------------------question-------------------- */}
        {!loading && !gameOver && (
          <Question
            className="test"
            source={questions[questionNumber].source}
            sourceType={questions[questionNumber].sourceType}
            totalQuestions={totalQuestions}
            hasAnswered={hasAnswered}
            amount={amount}
            questionNumber={questionNumber + 1}
            text={questions[questionNumber].text}
            answersArr={questions[questionNumber].answersArr} //combination of fakes and correct answer
            userAnswers={userAnswers ? userAnswers[questionNumber] : undefined}
            checkAnswer={checkAnswer}
          />
        )}
        {/* ------------------nextQuestion-------------------- */}
        {!gameOver &&
        !loading &&
        userAnswers.length === questionNumber + 1 &&
        questionNumber !== totalQuestions - 1 ? (
          <button onClick={nextQuestion}>siguiente</button>
        ) : null}
      </div>
      <div className="rightContainer">
        <img
          className="fort"
          src={
            "https://64.media.tumblr.com/872ec93cfbff2554cc4dbe84e27fc64b/tumblr_p3cofgka9h1wyvojio1_1280.gifv"
          }
        />
      </div>
    </div>
  );
};

export default App;
