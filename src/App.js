import { useEffect } from "react";
import "./App.css";
import TimelineChart from "./components/time-line-chart";
import { formatData } from "./lib/format-data";
function App() {
  useEffect(() => {
    formatData();
  }, []);

  return (
    <div className="App">
      <TimelineChart />
    </div>
  );
}

export default App;
