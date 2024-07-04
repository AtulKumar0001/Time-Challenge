import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({
  result,
  targetTime,
  Ref,
  remainingTIme,
  onReset,
}) {
  const userLost = remainingTIme <= 0;
  const formattedRemainingTime = (remainingTIme / 1000).toFixed(2);
  const score = Math.round((1 - remainingTIme / (targetTime * 1000)) * 100);

  const dialog = useRef();
  useImperativeHandle(Ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={dialog}>
      {userLost ? <h2>You lost</h2> : <h1>Your score: {score}</h1>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
