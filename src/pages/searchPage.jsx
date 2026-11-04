
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: () => searchMovies(query),
    enabled: query.trim().length > 0,
  });

  const movies = (data?.results || []).map((movie) => ({
    ...movie,
    genre_ids: movie.genre_ids || [],
  }));

  return (
    <>
      <Typography variant="h4" sx={{ margin: 2 }}>
        Search Movies
      </Typography>

      <TextField
        fullWidth
        label="Search for a movie"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      {isError && (
        <Typography color="error">
          {error.message}
        </Typography>
      )}

      {isPending && query.trim().length > 0 && <Spinner />}

      {query.trim().length > 0 && !isPending && !isError && (
        movies.length > 0 ? (
          <PageTemplate
            title={`Results for "${query}"`}
            movies={movies}
            action={(movie) => <></>}
          />
        ) : (
          <Typography sx={{ margin: 2 }}>
            No movies found.
          </Typography>
        )
      )}
    </>
  );
};

export default SearchPage;
