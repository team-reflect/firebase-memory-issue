import React, { useCallback } from "react";
import { onNotesSnapshotV3 } from "services/api/notes-v3";

const DebugComponent: React.FC = () => {
  const [count, setCount] = React.useState<string | number>(0);
  const [started, setStarted] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const start = useCallback(async (maxCount) => {
    setStarted(true);
    console.log("[DebugComponent] start loading data");
    await onNotesSnapshotV3(maxCount, setCount);
    console.log("[DebugComponent] finish loading data");
    setDone(true);
  }, []);

  return (
    <div>
      {started ? <p>loaded documents: {count}</p> : null}
      {started ? null : (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[100, 500, 1000, 2000, 5000].map((maxCount) => {
            return (
              <li key={maxCount}>
                <button onClick={() => start(maxCount)}>
                  click me to load {maxCount} documents
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {done && <h1>Finished!</h1>}
    </div>
  );
};

export default DebugComponent;
