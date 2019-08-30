import React, { useState } from 'react';
import classes from './MovieList.module.css';

import SearchBar from '../../Components/SearchBar/SearchBar';
import Movie from './Movie/Movie';

import { API, API_KEY } from '../../helpers/constants';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setPage] = useState(1);

  const moviesPerPage = 5;
  const lastMovie = currentPage * moviesPerPage;
  const firstMovie = lastMovie - moviesPerPage;
  const currentMovies = movieList.slice(firstMovie, lastMovie);

  const handlePage = (event) => {
    setPage(event.target.id);
  }

  const pages = [];
  for (let i = 1; i <= Math.ceil(movieList.length / moviesPerPage); i++) {
    pages.push(i);
  }

  const handleChange = (event) => {
    setQuery(event.target.value);
  }

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      search(query.replace(' ', '+'));
    }
  };

  const search = async (query) => {
    try {
      const rawResponse = await fetch(
        `${API}search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
      );
      const response = await rawResponse.json();
      setMovieList(response.results);
      console.log(response.results);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <SearchBar
        keyDown={handleKey}
        changed={handleChange}
        value={query} />
      <div>{movieList.map((mov, index) => (
        <Movie
          key={index}
          movie={mov} />
      ))}
        <div></div>
      </div>

    </div>
  )
}

export default MovieList;