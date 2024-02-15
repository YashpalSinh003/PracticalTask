import { useQuiz } from "../Context/Quizcontext";

export default function Questions() {
  const { dataArr, dispatch, userAnswer, totalQuestions, index } = useQuiz();

  return (
    <div>
      <h4>{dataArr.question}</h4>
      <Option
        data={dataArr[index]}
        dispatch={dispatch}
        userAnswer={userAnswer}
      />
      {userAnswer !== null && (
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({ type: index < totalQuestions - 1 ? "next" : "finished" })
          }
        >
          {index < totalQuestions - 1 ? "Next" : "Finish Quiz"}
        </button>
      )}
    </div>
  );
}

function Option({ data, dispatch, userAnswer }) {
  return (
    <div className="options">
      <h3>{data.question}</h3>
      {data["incorrect_answers"].map((item, index) => (
        <button
          className={`btn btn-option ${item === userAnswer ? "answer" : ""} ${
            userAnswer !== null
              ? item === data["correct_answer"]
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={item}
          disabled={userAnswer !== null}
          onClick={() => dispatch({ type: "onAnswer", payload: item })}
        >
          {item}
        </button>
      ))}
      {userAnswer ? (
        userAnswer !== data["correct_answer"] ? (
          <p className="rigthAns">
            <div style={{ color: "#ef4444", fontSize: "2.2rem" }}>
              Wrong Answer!!
            </div>
            <span>Correct Answer is =&gt; </span> {data["correct_answer"]}
          </p>
        ) : (
          <p style={{ color: "#86efac" }} className="rigthAns">
            Great! Correct Answer.
          </p>
        )
      ) : (
        ""
      )}
    </div>
  );
}
