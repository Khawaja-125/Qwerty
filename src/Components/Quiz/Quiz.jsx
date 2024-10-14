// import React from 'react'
import { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data.js";
const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];
  const chechkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev+1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans-1].current.classList.add("correct");
      }
    }
  };
  const nextQuestion = () => {
    if(lock === true){
      if(index === data.length-1){
       setResult(true)
       return 0
      }
      setIndex(++index)
      setQuestion(data[index])
      setLock(false)
      option_array.map((opt) => {
        opt.current.classList.remove("correct");
        opt.current.classList.remove("wrong");
        return null;
      })
    }
  }
  const reset = () => {
    setIndex(0)
    setScore(0)
    setQuestion(data[index])
    setLock(false)
    setResult(false)
    
  }
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result?<></>:<><h2>
        {index + 1}. {question.question}
      </h2>
      <ul>
        <li
          ref={Option1}
          onClick={(e) => {
            chechkAns(e, 1);
          }}
        >
          {question.option1}
        </li>
        <li
          ref={Option2}
          onClick={(e) => {
            chechkAns(e, 2);
          }}
        >
          {question.option2}
        </li>
        <li
          ref={Option3}
          onClick={(e) => {
            chechkAns(e, 3);
          }}
        >
          {question.option3}
        </li>
        <li
          ref={Option4}
          onClick={(e) => {
            chechkAns(e, 4);
          }}
        >
          {question.option4}
        </li>
      </ul>
      <button onClick={nextQuestion}>Next</button>
      <div className="index">{index+1} of {data.length} Questions</div>
    </>}
    {result?<> <h2>You scored {score} out of {data.length}</h2>
    <button onClick={reset}>Reset</button></>:<></>}
    </div>  
  );
}
export default Quiz;
