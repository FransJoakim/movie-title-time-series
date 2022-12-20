import { useEffect, useState } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
import { MovieElement } from "./MovieElement";

export default function Graph(timeSeriesData: TimeSeriesData) {
  const { screenWidth } = useWindowDimensions();
  const [timeSeriesElements, setTimeSeriesElements] = useState<JSX.Element[]>(
    []
  );

  const createTimeSeriesElements = () => {
    const width = screenWidth / Object.keys(timeSeriesData).length / 1.1;
    const newElements = [];
    for (const [year, movieData] of Object.entries(timeSeriesData)) {
      const TimeSeriesElement = (
        <div
          key={year}
          style={{
            width: `${width}px`,
          }}
        >
          <div className="movies">
            {movieData.map((movie) => (
              <MovieElement {...movie} key={movie.Title} />
            ))}
          </div>
          <div className="year">{year}</div>
        </div>
      );
      newElements.push(TimeSeriesElement);
    }
    setTimeSeriesElements(newElements);
  };

  useEffect(() => {
    createTimeSeriesElements();
  }, [timeSeriesData, screenWidth]);

  return (
    <div className="graph">
      {timeSeriesElements.map((element) => element)}
      {timeSeriesElements.length === 0 && (
        <p>Sorry, we couldn't find any movies with that title</p>
      )}
    </div>
  );
}
