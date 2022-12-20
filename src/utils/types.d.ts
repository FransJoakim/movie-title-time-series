type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  type: string;
  Poster: string;
};

type TimeSeriesData = { [key: string]: Movie[] };
