import Header from "./ui/Header";
import HomePage from "./Components/HomePage";

import { QuizContext } from "./Context/Quizcontext";

export default function App() {
  return (
    <QuizContext>
      <div className="app">
        <Header />
        <HomePage />
      </div>
    </QuizContext>
  );
}
