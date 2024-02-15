import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  dataArr: [],
  status: "loading",
  index: 0,
  userAnswer: null,
  rightAnswered: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ready":
      return { ...state, dataArr: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    case "onAnswer":
      return {
        ...state,
        userAnswer: action.payload,
        rightAnswered:
          state.dataArr[state.index]["correct_answer"] === action.payload
            ? state.rightAnswered + 1
            : state.rightAnswered,
      };
    case "next":
      return { ...state, index: state.index + 1, userAnswer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        dataArr: state.dataArr,
      };
    default:
      throw new Error("Action Unknown");
  }
}

const quizProvider = createContext();

function QuizContext({ children }) {
  const [{ dataArr, index, status, userAnswer, rightAnswered }, dispatch] =
    useReducer(reducer, initialState);

  const totalQuestions = dataArr.length;

  useEffect(function () {
    let controller = new AbortController();
    async function getData() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to get Questions");
        const apiData = await res.json();
        const data = apiData.results;
        data.forEach((item) =>
          item["incorrect_answers"].push(item["correct_answer"])
        );

        dispatch({ type: "ready", payload: data });
      } catch (err) {
        if (err.message === "The user aborted a request.") return;
        dispatch({ type: "error" });
      }
    }
    getData();

    return function () {
      controller.abort();
    };
  }, []);

  return (
    <quizProvider.Provider
      value={{
        dataArr,
        index,
        status,
        userAnswer,
        rightAnswered,
        totalQuestions,
        dispatch,
      }}
    >
      {children}
    </quizProvider.Provider>
  );
}

function useQuiz() {
  const value = useContext(quizProvider);
  if (value === undefined)
    throw new Error("Context is read before context provider");
  return value;
}

export { QuizContext, useQuiz };
