import { useState } from "react";

export default function ScalableDiv() {
  const [scale, setScale] = useState(100); // Tailwind uses percentage-based scaling

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div
        className={`w-32 h-32 bg-blue-500 flex items-center justify-center text-white font-bold transition-transform`}
        style={{ transform: `scale(${scale / 100})` }}
      >
        Scale Me
      </div>
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setScale(scale + 10)}
        >
          Zoom In
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setScale(Math.max(scale - 10, 50))}
        >
          Zoom Out
        </button>
      </div>
    </div>
  );
}
