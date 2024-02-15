import { useQuiz } from "../Context/Quizcontext";

export default function Finished() {
  const { dispatch, rightAnswered, totalQuestions } = useQuiz();
  return (
    <div>
      <p className="result">
        {rightAnswered > 7
          ? "You are exceptional intellectual."
          : rightAnswered > 4
          ? "You did great!"
          : "You just missed (Try to retake the test)"}
      </p>
      <div className="resultDiv">Total Questions = {totalQuestions}</div>
      <div className="resultDiv">Correct Answered = {rightAnswered}</div>
      <div className="resultDiv">
        Wrong Answered = {totalQuestions - rightAnswered}
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
        style={{ marginTop: "2.9rem", padding: "2rem" }}
      >
        Restart Quiz
      </button>
    </div>
  );
}
