import { useRef, useState } from "react";
import ResultModal from "./ResultModal";
export default function TimeChallenge({ title, targetTime }) {
  let timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    handleStop();
    dialog.current.open();
  }

  function handleResetTime() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleTimerClick() {
    timer.current = setInterval(() => {
      setTimeRemaining((prev) => {
        return prev - 10;
      });
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }
  console.log(timeRemaining);
  return (
    <>
      <ResultModal
        Ref={dialog}
        targetTime={targetTime}
        result="lost"
        remainingTIme={timeRemaining}
        onReset={handleResetTime}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleTimerClick}>
            {" "}
            {timerActive ? "Stop challenge" : "Start challenge"}{" "}
          </button>
        </p>
        <p className={timerActive ? "active" : ""}>
          {timerActive ? "Timer is running" : "Timer is inactive"}{" "}
        </p>
      </section>
    </>
  );
}
