import { useEffect, useRef, useState } from "react";
import Graph from "./components/graph";
import { fetchMovies } from "./utils/fetchMovies";

function App() {
  const [timeSeriesData, setTimeSeriesData] = useState({});
  const [searchValue, setSearchValue] = useState("Santa Claus");

  const fetchAndUpdate = () => {
    requestAnimationFrame(() =>
      fetchMovies(searchValue).then((data) => setTimeSeriesData(data))
    );
  };

  const fetchFunctionRef = useRef(fetchAndUpdate);
  useEffect(() => {
    fetchFunctionRef.current = fetchAndUpdate;
  });

  useEffect(() => {
    fetchAndUpdate();
    const fetchOnEnter = (key: string) => {
      if (key === "Enter") fetchFunctionRef.current();
    };
    window.addEventListener("keypress", (e) => fetchOnEnter(e.key));

    return () => {
      window.removeEventListener("keypress", (e) => fetchOnEnter(e.key));
    };
  }, []);

  return (
    <div className="app">
      <div className="search">
        <p>Try the movie-title-time-series search...</p>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={() => fetchFunctionRef.current()}>Search</button>
      </div>
      <Graph {...timeSeriesData} />
    </div>
  );
}

export default App;
