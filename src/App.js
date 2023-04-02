import { useState } from "react";

import Answer from "./components/Answer";
import { initialQuestions } from "./data/data";

// TODO
  // Disable next button if nothing is selected
  // Add answers

function App() {
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState('start')
  const [questions, setQuestions] = useState(initialQuestions)
  const result = (questions.filter(question => question.correct === true).length / questions.length) * 100

  function handleStartClick() {
    setPage(1);
    setStatus('progress')
  }

  function handleNextClick() {

    if (page <= questions.length - 1) {
      setPage(page + 1);
    } else {
      setStatus('results')
    }
  }

  function handleResetClick() {
    setStatus('start')
  }

  function handleChoicesClick(e) {
     if (e.target.value === questions[page - 1].answer) {
      setQuestions(questions.map(question => {
        if (question.id === questions[page - 1].id) {
          return {
            ...question,
            correct: true,
            selected: true
          }
        } else {
          return question
        }
      }))
     }
  }

  return (
    <div className="App">
      <div className="quiz-container">
        <header>
          <div className="logo"></div>
          <h2 className="pagination">
            {
              status === 'progress' ?
              `${page} / ${questions.length}`
              : status === 'results' ?
              `Results`
              : status === 'start' ?
              'Get ready!' :
              null
            } 
          </h2>
        </header>
        {
        // Start & results page
        status === 'start' ?
          <div className="start-container">
            <h3>{questions.length} Questions in total</h3>
            <button 
              className="start-button"
              onClick={handleStartClick}
            >
              Start
            </button>
          </div>
        : status === 'results' ?
          <div className="results-container">
            <h2 className="grade">{
              result >= 80 ?
              "Excellent"
              : result >= 60 && result < 80 ?
              "Well done"
              : result >= 40 && result < 60 ?
              "Fair"
              : "Oh dear!"
            }</h2>
            <h3 className="score">{result}% correct</h3>
            <button 
              className="reset-button"
              onClick={handleResetClick}
            >
              Retake Quiz
            </button>
          </div>
        : null
        }
        {/* Questions pages */}
        {
        status === 'progress' &&
          <div className="progress-container">
            <h2 className="question">{questions[page - 1].question}</h2>
            <p>Please select an answer:</p>
            <div className="answers-container">
              <form>
                {questions[page - 1].choices.map(choice => 
                  <Answer key={choice} choice={choice} handleChoicesClick={handleChoicesClick} />
                )}
              </form>
              {
                page >= 1 && page <= 9 ?
                  <button
                  type="submit"
                    onClick={handleNextClick}
                    className="next-button"
                    id="next-button"
                    //disabled={selected}
                  >
                    Next Question
                  </button>
                  :
                  <button 
                    className="results-button"
                    onClick={handleNextClick}
                  >
                    Results
                  </button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
