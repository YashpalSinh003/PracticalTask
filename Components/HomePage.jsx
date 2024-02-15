import Loader from "../ui/Loader";
import Error from "../ui/Error";
import StartScreen from "../ui/StartScreen";
import Progress from "../ui/Progress";
import Finished from "./Finished";
import Questions from "./Questions";
import { useQuiz } from "../Context/Quizcontext";

export default function HomePage() {
  const { status } = useQuiz();

  return (
    <div className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Questions />
        </>
      )}
      {status === "finished" && <Finished />}
    </div>
  );
}
