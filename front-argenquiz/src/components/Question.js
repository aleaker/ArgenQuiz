import React from "react";

const Question = ({
  amount,
  questionNumber,
  text,
  source,
  sourceType,
  politicianId,
  answersArr,
  checkAnswer
}) => (
  <div>
    <p>Pregunta: {questionNumber} / {amount}</p>
    <p>{text}</p>
    <div>
        {answersArr.map(answer=>(
            <div>
                <button value={answer} onClick={checkAnswer}>
                    {answer}
                </button>
            </div>
        ))}
    </div>
  </div>
);

export default Question;
