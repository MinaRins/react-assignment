
import { useContext } from "react";
import { MoviesContext } from "../../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToPlaylist = ({ movie }) => {
  const { playlist, addToPlaylist, removeFromPlaylist } =
    useContext(MoviesContext);

  const isInPlaylist = playlist.includes(movie.id);

  const handleClick = () => {
    if (isInPlaylist) {
      removeFromPlaylist(movie);
    } else {
      addToPlaylist(movie);
    }
  };

  return (
    <IconButton
      aria-label="Toggle watchlist"
      onClick={handleClick}
      color={isInPlaylist ? "success" : "default"}
    >
      {isInPlaylist ? (
        <PlaylistAddCheckIcon />
      ) : (
        <PlaylistAddIcon />
      )}
    </IconButton>
  );
};

export default AddToPlaylist;
