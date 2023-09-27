"use client";

import React from "react";
import useMovieList from "@/hooks/useMovieList";
import MovieList from "@/components/MovieList";
import useFavourites from "@/hooks/useFavourites";

const MovieSection = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  return (
    <div className="pb-40">
      <MovieList title="Trending Now" data={movies} />
      <MovieList title="My List" data={favourites} />
    </div>
  );
};

export default MovieSection;
