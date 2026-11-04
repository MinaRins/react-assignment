
import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToPlaylist from "../components/cardIcons/addToPlaylist";

const WatchlistPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  const watchlistQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const isPending = watchlistQueries.some(
    (query) => query.isPending
  );

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchlistQueries
    .filter((query) => query.data)
    .map((query) => {
      return {
        ...query.data,
        genre_ids: query.data.genres.map((genre) => genre.id),
      };
    });

  return (
    <PageTemplate
      title="My Watchlist"
      movies={movies}
      action={(movie) => (
        <AddToPlaylist movie={movie} />
      )}
    />
  );
};

export default WatchlistPage;
