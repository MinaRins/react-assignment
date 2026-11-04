
import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlist, setPlaylist] = useState([]);

  const addToFavorites = (movie) => {
    setFavorites((previous) =>
      previous.includes(movie.id)
        ? previous
        : [...previous, movie.id]
    );
  };

  const removeFromFavorites = (movie) => {
    setFavorites((previous) =>
      previous.filter((mId) => mId !== movie.id)
    );
  };

  const addReview = (movie, review) => {
    setMyReviews((previous) => ({
      ...previous,
      [movie.id]: review
    }));
  };

  // Add movie to watchlist
  const addToPlaylist = (movie) => {
    setPlaylist((previous) =>
      previous.includes(movie.id)
        ? previous
        : [...previous, movie.id]
    );
  };

  // Remove movie from watchlist
  const removeFromPlaylist = (movie) => {
    setPlaylist((previous) =>
      previous.filter((mId) => mId !== movie.id)
    );
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlist,
        addToPlaylist,
        removeFromPlaylist
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
