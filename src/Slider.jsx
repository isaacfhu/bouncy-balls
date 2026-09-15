//import { useState } from "react";

function Slider({ name, min, max, step = 1, value, onChange }) {
  return (
    <div className="slider-container">
      <h4>{name}</h4>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="slider"
        id={name}
      />

      <p>Amount : {value}</p>
    </div>
  );
}

export default Slider;
