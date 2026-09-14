import { useEffect, useRef } from "react";
import { initCanvas } from "./canvas";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const controls = initCanvas(canvasRef.current, {
        xCanvas: window.innerWidth,
        yCanvas: window.innerHeight,

        gravity: 1,
        friction: 0.99,
        ballCount: 150,
        minRadius: 8,
        maxRadius: 18,
        initialVelocity: { min: -10, max: 10 },
      });
      window.controls = controls;

      return () => {
        controls.destroy();
      };
    }
  }, []);
  return (
    <div id="dash">
      <h1>Bouncy Balls!</h1>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
