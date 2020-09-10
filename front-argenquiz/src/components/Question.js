import React from "react";
import Source from "../components/Source";
import ProgesionBar from "../components/ProgesionBar";

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
  userAnswers,
  videoClosed,
  closeVideo
}) => (
  <div className="questionContainer">
    <ProgesionBar 
    totalQuestions={totalQuestions}
    questionNumber={questionNumber}
    userAnswers={userAnswers}

     />
    <p>{text}</p>
    <div className="answersContainer">
      {answersArr.map((answer) => (
        <div
          onClick={() => checkAnswer(answer)}
          key={answer}
          className={
            hasAnswered
              ? politicianId == answer
                ? "singleAnswerContainer disabled"
                : "singleAnswerContainer disabled gray"
              : "singleAnswerContainer"
          }
        >
          <img
            className="politicianImg"
            src={require("../images/menemtest.png")}
          />
          <button className="politicianButton">{answer}</button>
        </div>
      ))}
    </div>
    {hasAnswered && <Source source={source} sourceType={sourceType} videoClosed={videoClosed} closeVideo={closeVideo} />}
  </div>
);

export default Question;
