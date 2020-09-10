import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Starter from "./components/Starter";
import Loading from "./components/Loading";
import Reset from "./components/Reset";
const siguienteButtonPressed = require("./images/siguientePressed.png");
const siguienteButton = require("./images/siguiente.png");
const logo = require("./images/solNoPixel.png");
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [amount, setAmount] = useState(5);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [reset, setReset] = useState(true);
  const [videoClosed,setVideoClosed] = useState(false);



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
    setReset(false);
    setIsPressed(false);
  };

useEffect(()=>{
  if(hasAnswered) window.scrollTo(0, 1000);
})



  
  const checkAnswer = (answer) => {
    if (!gameOver) {
      const correct = questions[questionNumber].politicianId === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      setUserAnswers((prev) => [...prev, correct]);
      if (userAnswers.length >= questionNumber) {
        setHasAnswered(true);
      }
    }
  };

  const nextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    setHasAnswered(false);
    setVideoClosed(false);
  };

  const politiciansNames = [
    "Miauricio Macri",
    "Alita Carrio",
    "Cretina Fernandez",
    "Carlito Menem",
    "Moyerno Moreno",
  ];

  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
  
  const getPoliticiansNames = (arr, answ) => {
    let answArr = arr.map((index) => politiciansNames[index]);
    answArr.push(answ);
    shuffleArray(answArr)
    return answArr;
  };

  const fetchQuestions = async (amount) => {
    const api = `https://b9ktant6bd.execute-api.sa-east-1.amazonaws.com/dev/questions?amount=${amount}`;
    const questionsArr = await (await fetch(api)).json(); //awaits for response and then for it to be parsed
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

  const reStart = () => {
    setReset(true);
    setGameOver(true);
  };

  const closeVideo = ()=>{
    setVideoClosed(true);
  }

  



  return (
    <div className="App" >


      <div className="centerContainer">
        <div className="titleContainer">
          <img id="logo" src={logo} />
          <div className="logotipo">
            <h1 className="title">Todos</h1>
            <h1 className="title">Truchos</h1>
          </div>
        </div>

        {gameOver && (
          <div className="introContainer">
            <p>¿Podés adivinar quién fue el autor de cada frase o evento?</p>
            <p>Elegí la cantidad de preguntas y jugá.</p>
          </div>
        )}
        {/* ------------------start-------------------- */}
        {(gameOver || userAnswers.length === totalQuestions) && reset && (
          <Starter
            start={start}
            amount={amount}
            handleChange={handleChange}
            isPressed={isPressed}
          />
        )}

        {/* ------------------data-------------------- */}
        {/* {!gameOver && <p>Puntuación: {score}</p>} */}
        {loading && <Loading />}
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
            userAnswers={userAnswers ? userAnswers : undefined}
            checkAnswer={checkAnswer}
            politicianId={questions[questionNumber].politicianId}
            videoClosed={videoClosed}
            closeVideo={closeVideo}
          />
        )}
        {/* ------------------nextQuestion-------------------- */}
        {!gameOver &&
        !loading &&
        userAnswers.length === questionNumber + 1 &&
        questionNumber !== totalQuestions - 1 ? (
          <input
            type="image"
            id="continuarButton"
            src={siguienteButton}
            onClick={nextQuestion}
          />
        ) : null}
        {gameOver ||
          (userAnswers.length === totalQuestions && !reset && (
            <Reset reStart={reStart} />
          ))}
      </div>
      <div id="footer"></div>
      
    </div>
  );
};

export default App;
