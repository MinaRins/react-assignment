import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Spinner from "../components/spinner";
import { getPerson, getPersonCredits } from "../api/tmdb-api";

const PersonPage = () => {
  const { id } = useParams();
  const person = useQuery({ queryKey: ["person", id], queryFn: () => getPerson(id) });
  const credits = useQuery({ queryKey: ["personCredits", id], queryFn: () => getPersonCredits(id) });

  if (person.isPending || credits.isPending) return <Spinner />;
  if (person.isError) return <h1>{person.error.message}</h1>;
  if (credits.isError) return <h1>{credits.error.message}</h1>;

  const p = person.data;
  const films = [...credits.data.cast]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 18);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
        {p.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w342${p.profile_path}`}
            alt={p.name}
            style={{ width: 200, borderRadius: 8 }}
          />
        )}
        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Typography variant="h3">{p.name}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {[p.birthday, p.place_of_birth].filter(Boolean).join(" · ")}
          </Typography>
          <Typography>{p.biography || "No biography available."}</Typography>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mb: 1 }}>Known for</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 2 }}>
        {films.map((m) => (
          <Box key={m.credit_id} component={Link} to={`/movies/${m.id}`}
               sx={{ textDecoration: "none", color: "inherit" }}>
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
            <Typography variant="caption">{m.character}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PersonPage;