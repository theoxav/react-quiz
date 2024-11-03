import {initialState, questionsReducer} from "@/reducers/questions";
import {useEffect, useReducer} from "react";

import Error from "@/components/UI/Error";
import FinishScreen from "@/components/FinishScreen";
import Footer from "@/components/Layouts/Footer.jsx";
import Header from "@/components/Layouts/Header";
import Loader from "@/components/UI/Loader";
import Main from "@/components/Layouts/Main";
import NextButton from "@/components/US/NextButton";
import Options from "@/components/Question/components/Options";
import Progress from "@/components/US/Progress";
import Question from "@/components/Question/Question";
import StartScreen from "@/components/StartScreen";
import Timer from "@/components/US/Timer.jsx";

export default function App() {
    const [{questions, status, index, answer, points, highScore, secondsRemaining}, dispatch] =
        useReducer(questionsReducer, initialState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + cur.points,
        0
    );

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("http://localhost:5000/questions");
                const data = await res.json();
                dispatch({type: "DATA_RECEIVED", payload: data});
            } catch (error) {
                dispatch({type: "DATA_FAILED"});
            }
        };
        fetchQuestions();
    }, []);

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && (
                    <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            numQuestion={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Footer>
                            <Question question={questions[index]}>
                                <Options
                                    question={questions[index]}
                                    dispatch={dispatch}
                                    answer={answer}
                                />
                                <NextButton
                                    dispatch={dispatch}
                                    answer={answer}
                                    index={index}
                                    numQuestion={numQuestions}
                                />
                            </Question>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
