import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const Toss = () => {
  const [angle, setAngle] = useState<number>(0);

  const flipCoin = () => {
    // 💡 Consider using a boolean state like `isHeads` for clearer logic instead of angle arithmetic
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
    // 💡 You could also use CSS animations instead of manually changing rotation to make the flip smoother
  };

  return (
    <div className="admin_container">
      <Sidebar />
      <main className="dashboard_app_container">
        <h1>Toss</h1>
        <section>
          <article
            className="tosscoin"
            onClick={flipCoin}
            style={{
              transform: `rotateY(${angle}deg)`,
              transition: "transform 0.6s ease-in-out", // 💡 Add transition for smoother flipping effect
              cursor: "pointer", // 💡 Indicates interactivity
            }}
          >
            {/* 💡 Add content or classes to represent heads/tails visually */}
            <div className="coin-front">Heads</div>
            <div className="coin-back">Tails</div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Toss;
