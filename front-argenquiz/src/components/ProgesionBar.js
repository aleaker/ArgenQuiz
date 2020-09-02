import React from "react";
const correct = require("../images/check.png");
const wrong = require("../images/quit.png");
const empty = require("../images/question.png");

const ProgesionBar = ({ totalQuestions, questionNumber, userAnswers }) => (
  <div className="progresionContainer">
      {Array(totalQuestions).fill("a").map((x,index)=>(
            
        <img className="progresionIcon" src={
            userAnswers[index]?correct:(userAnswers[index] === false? wrong: empty)
        }
        />
            
      ))
      }
  </div>
);

export default ProgesionBar;

// Array(totalQuestions).fill("a").map((x,index)=>(
// userAnswers[index]
