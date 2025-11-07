import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";

// 💡 Consider extracting this utility to a shared utils/time.ts file if reused elsewhere
const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  // ⏱️ You could simplify with a helper function to avoid repetition
  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // ⚙️ Consider using `useCallback` for handlers if this component grows or re-renders often
  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    // 🧩 It's safer to initialize as `ReturnType<typeof setInterval>` for proper typing
    let intervalID: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      intervalID = setInterval(() => {
        // ✅ Functional update ensures correct state when updates are batched
        setTime((prev) => prev + 1);
      }, 1000);
    }

    // 🧹 Always clear interval on cleanup to prevent memory leaks
    return () => {
      if (intervalID) clearInterval(intervalID);
    };
  }, [isRunning]); // ⏰ Could also depend on `time` if you need side effects when time changes

  return (
    <div className="admin_container">
      <Sidebar />
      <main className="dashboard_app_container">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            {/* ⏲️ Could use a monospace font or animation to enhance readability */}
            <h2>{formatTime(time)}</h2>

            {/* 🔘 You might extract these buttons into a small reusable component with consistent styles */}
            <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetHandler}>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
  return (
    <div className="admin_container">
      <Sidebar />
      <main className="dashboard_app_container">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            <h2>{formatTime(time)}</h2>
            <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetHandler}>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
