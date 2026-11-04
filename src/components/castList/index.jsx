import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Avatar, Box, Typography } from "@mui/material";
import { getMovieCredits } from "../../api/tmdb-api";

const CastList = ({ movieId }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["credits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });
  if (isPending || isError) return null;

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>Cast</Typography>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
        {data.cast.slice(0, 15).map((c) => (
          <Box
            key={c.id}
            component={Link}
            to={`/person/${c.id}`}
            sx={{ textAlign: "center", width: 100, flexShrink: 0, textDecoration: "none", color: "inherit" }}
          >
            <Avatar
              src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : undefined}
              sx={{ width: 80, height: 80, mx: "auto", mb: 0.5 }}
            />
            <Typography variant="body2" fontWeight="bold">{c.name}</Typography>
            <Typography variant="caption">{c.character}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CastList;
