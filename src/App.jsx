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
        ballCount: 400,
        minRadius: 1,
        maxRadius: 2,
        initialVelocity: { min: -10, max: 10 },
      });
      window.controls = controls;

      return () => {
        controls.destroy();
      };
    }
  }, []);
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
