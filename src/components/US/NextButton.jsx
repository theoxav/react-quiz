export default function NextButton({ dispatch, answer, index, numQuestion }) {
  if (answer === null) return null;

  if (index < numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      >
        Next
      </button>
    );

  if (index === numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "END_QUIZ" })}
      >
        Finish
      </button>
    );
}
