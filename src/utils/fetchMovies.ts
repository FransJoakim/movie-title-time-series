export const fetchMovies = async (searchValue: string) => {
  const sortByYear = (list: Movie[]) => {
    if (list === undefined) return [];
    return list.sort((a, b) => Number(a.Year) - Number(b.Year));
  };

  const createTimeSeriesDataObject = (list: Movie[]) => {
    const timeSeriesData: TimeSeriesData = {};
    if (list.length === 0) return timeSeriesData;
    for (let i = Number(list[0].Year) - 2; i <= 2023; i++) {
      timeSeriesData[i] = list.filter((movie) => movie.Year === String(i));
    }
    return timeSeriesData;
  };

  const movieData = fetch(
    `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_APIKEY}&s=${searchValue}`
  )
    .then((res) => res.json())
    .then((data) => sortByYear(data.Search))
    .then((data) => createTimeSeriesDataObject(data));

  return movieData;
};
