import React, {useState} from 'react';
import Countdown from 'react-countdown';
import QuestionCard from './components/QuestionCard';
import {fetchQuestions} from "./API"
import { type } from 'node:os';
import {Style, Wrapper} from "./App.styles"

import  {QuestionState, Difficulty} from "./API"
import { truncate } from 'node:fs';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;

}

type ResultObject = {
  pass: string;
  fail: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(true);
  const [pass, setPass] = useState(false); 
  const [start, setStart] = useState(false);
  const [counter, setCounter] = React.useState(60);
  

  React.useEffect(() => {
    
    
    
    
  }, [counter]);

  const startTimer = () => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000) 
    
    const nextQuestion = number + 1;
    if (counter == 0) {
      setEnd(true)
      if (score > 4) {
        window.location.href = `/success/${score}`
      } else {
        window.location.href = `/failure/${score}`
      }
    } else if ((nextQuestion === TOTAL_QUESTIONS)) {
      setEnd(true);
      if (score > 4) {
        window.location.href = `/success/${score}`
      } else {
        window.location.href = `/failure/${score}`
      }
     
    } 
  }



  const startQuiz = async () => {
    setLoading(true);
    setEnd(false);
    
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(newQuestions)
    startTimer()
    setScore(0)
    setUserAnswers([])
      setNumber(0)
      setLoading(false)
      setStart(true)
    
     

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!end) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, AnswerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
   
    if (nextQuestion === TOTAL_QUESTIONS) {
      setEnd(true);
      if (score > 4) {
        window.location.href = `/success/${score}`
      } else {
        window.location.href = `/failure/${score}`
      }
      
      score > 4 ? setPass(true) : setPass(false) 
    } 
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
    <Style/>
    <Wrapper>
     <h1>QUIZ APP</h1>
     {end || userAnswers.length === TOTAL_QUESTIONS ? <button className="start" onClick={startQuiz}>Start</button> : null}
     {start ? <button className="countdown">{counter}</button> : null}
     {!end ? <p className="score">Score: {score * 100 / TOTAL_QUESTIONS}% {score > 4 ? <span>Pass</span> : null}</p> : <p>You must score up to 50% for a pass</p>}
     {loading && <p>Loading Questions...</p>}
   { !loading && !end &&
   <QuestionCard 
      questionNr={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
     />} 
    
     
     {!end && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? <button className="next" onClick={nextQuestion}>Next Question</button> : null}
    </Wrapper>
    </>
  );
}

export default App;
