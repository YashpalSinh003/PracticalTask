import { useQuiz } from "../Context/Quizcontext";

export default function Progress() {
  const { totalMark, totalQuestions, index, points, rightAnswered } = useQuiz();
  return (
    <header className="progress">
      {/* <progress
        max={totalQuestions}
        value={index + Number(userAnswer !== null)}
      /> */}
      <p className="ques-number">
        <span>Question: </span>
        {index + 1}/{totalQuestions}
      </p>
      <p className="ques-number green">
        <span>Correct answered: </span>
        {rightAnswered}
      </p>
    </header>
  );
}
