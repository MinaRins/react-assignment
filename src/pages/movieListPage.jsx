import React, { useState, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Pagination, Box, TextField, MenuItem } from "@mui/material";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getMovieList, getTrending } from "../api/tmdb-api";

const sorters = {
  rating: (a, b) => b.vote_average - a.vote_average,
  date: (a, b) => (b.release_date || "").localeCompare(a.release_date || ""),
  title: (a, b) => a.title.localeCompare(b.title),
};

const MovieListPage = ({ category, title }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["list", category, page],
    queryFn: () =>
      category === "trending" ? getTrending(page) : getMovieList(category, page),
    placeholderData: keepPreviousData,
  });

  const movies = useMemo(() => {
    const list = [...(data?.results ?? [])];
    if (sort) list.sort(sorters[sort]);
    return list;
  }, [data, sort]);

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <Box sx={{ p: 2, pb: 0 }}>
        <TextField
          select
          label="Sort by"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="rating">Rating (high to low)</MenuItem>
          <MenuItem value="date">Release date (newest)</MenuItem>
          <MenuItem value="title">Title (A-Z)</MenuItem>
        </TextField>
      </Box>

      <PageTemplate
        title={title}
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />

      <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
        <Pagination
          count={Math.min(data.total_pages, 500)}
          page={page}
          onChange={(_, p) => {
            setPage(p);
            window.scrollTo(0, 0);
          }}
          color="primary"
        />
      </Box>
    </>
  );
};

export default MovieListPage;
