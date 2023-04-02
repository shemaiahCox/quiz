import Answer from "./Answer"

export default function Question({ handleChoicesClick, handleNextClick, question, page}) {
    return (
        <>
          <form>
              {question.choices.map(choice => 
                <Answer key={choice} choice={choice} handleChoicesClick={handleChoicesClick} />
              )}
            </form>
            {
              page >= 1 && page <= 9 ?
                <button
                onClick={handleNextClick}
                  className="next-button"
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
        </>
    )
}