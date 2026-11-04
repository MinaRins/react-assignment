import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Box, Typography } from "@mui/material";
import { getRecommendations } from "../../api/tmdb-api";

const Recommendations = ({ movieId }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: () => getRecommendations(movieId),
  });
  if (isPending || isError || data.results.length === 0) return null;

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>You might also like</Typography>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
        {data.results.slice(0, 12).map((m) => (
          <Box
            key={m.id}
            component={Link}
            to={`/movies/${m.id}`}
            sx={{ width: 130, flexShrink: 0, textDecoration: "none", color: "inherit" }}
          >
            {m.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                alt={m.title}
                style={{ width: "100%", borderRadius: 6 }}
              />
            ) : (
              <Box sx={{ width: "100%", aspectRatio: "2/3", bgcolor: "grey.800", borderRadius: 1 }} />
            )}
            <Typography variant="body2" sx={{ mt: 0.5 }}>{m.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Recommendations;
