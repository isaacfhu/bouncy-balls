import { useState, useEffect, useRef } from "react";
import { initCanvas } from "./canvas";
import Slider from "./Slider";

function App() {
  const canvasRef = useRef(null);

  const [ballCount, setBallCount] = useState(50);
  const [ballMinRadius, setBallMinRadius] = useState(8);
  const [ballMaxRadius, setBallMaxRadius] = useState(18);
  const [gravity, setGravity] = useState(1);
  const [friction, setFriction] = useState(0.99);
  const [minVelocity, setMinVelocity] = useState(10);
  const [maxVelocity, setMaxVelocity] = useState(10);

  useEffect(() => {
    if (!canvasRef.current) return;

    const controls = initCanvas(canvasRef.current, {
      gravity: gravity,
      friction: friction,
      ballCount: ballCount,
      minRadius: ballMinRadius,
      maxRadius: ballMaxRadius,
      initialVelocity: { min: -minVelocity, max: maxVelocity },
    });
    window.controls = controls;

    return () => {
      controls.destroy();
    };
  }, [ballCount, ballMinRadius, ballMaxRadius, minVelocity, maxVelocity]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (window.controls) {
      window.controls.updateSettings({ gravity, friction });
    }
  }, [gravity, friction]);

  return (
    <div id="dash">
      <h1>Bouncy Balls!</h1>
      <canvas ref={canvasRef}></canvas>
      <div id="options-container">
        <h3>Options</h3>
        <div id="options">
          <Slider
            name="Ball Count"
            min={1}
            max={1000}
            value={ballCount}
            onChange={setBallCount}
          />
          <Slider
            name="Gravity"
            min={-1}
            max={2}
            step={0.05}
            value={gravity}
            onChange={setGravity}
          />
          <Slider
            name="Friction"
            min={0.01}
            max={1}
            step={0.01}
            value={friction}
            onChange={setFriction}
          />
          <Slider
            name="Ball Min. Radius"
            min={1}
            max={ballMaxRadius}
            value={ballMinRadius}
            onChange={setBallMinRadius}
          />
          <Slider
            name="Ball Max. Radius"
            min={ballMinRadius}
            max={100}
            value={ballMaxRadius}
            onChange={setBallMaxRadius}
          />
          <Slider
            name="Ball Min. Velocity"
            min={1}
            max={maxVelocity}
            value={minVelocity}
            onChange={setMinVelocity}
          />
          <Slider
            name="Ball Max. Velocity"
            min={minVelocity}
            max={100}
            value={maxVelocity}
            onChange={setMaxVelocity}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
