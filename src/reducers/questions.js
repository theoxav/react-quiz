export const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

export function questionsReducer(state, action) {
    switch (action.type) {
        case "DATA_RECEIVED":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case "DATA_FAILED":
            return {
                ...state,
                status: "error",
            };
        case "START_QUIZ":
            return {
                ...state,
                status: "active",
            };
        case "NEW_ANSWER": {
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        }
        case "NEXT_QUESTION": {
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        }
        case "END_QUIZ": {
            return {
                ...state,
                status: "finished",
                highScore:
                    state.points > state.highScore ? state.points : state.highScore,
            };
        }
        case "RESTART_QUIZ": {
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };
        }
        case "TICK": {
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status,
            };
        }
        default:
            throw new Error("Unknown action");
    }
}
