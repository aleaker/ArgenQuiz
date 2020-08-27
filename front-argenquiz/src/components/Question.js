import React from "react";
import Source from "../components/Source";

const Question = ({
  amount,
  questionNumber,
  text,
  source,
  sourceType,
  politicianId,
  answersArr,
  checkAnswer,
  hasAnswered,
  totalQuestions,
}) => (
  <div>
    <p>
      Pregunta: {questionNumber} / {totalQuestions}
    </p>
    <p>{text}</p>
    <div>
      {answersArr.map((answer) => (
        <div key={answer}>
          <button
            
            disabled={hasAnswered ? true : false}
            value={answer}
            onClick={checkAnswer}
          >
            {answer}
          </button>
        </div>
      ))}
    </div>
    {hasAnswered && <Source source={source} sourceType={sourceType} />}
  </div>
);

export default Question;
