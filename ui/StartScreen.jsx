import { useQuiz } from "../Context/Quizcontext";

export default function StartScreen() {
  const { questionCount, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to Trivia Game</h2>
      <h3>Answer {questionCount} questions to text for knowledge!.</h3>
      <button className="btn" onClick={() => dispatch({ type: "active" })}>
        Let &apos; s Start
      </button>
    </div>
  );
}
