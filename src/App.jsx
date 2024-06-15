import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Details from "./routes/Details";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <Routes>
        <Route path="/Details/:id" element={<Details />}></Route>
        <Route
          path="/"
          element={
            <MovieList
              movies={filteredMovies}
              search={search}
              setSearch={setSearch}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
};

function MovieList({ movies, search, setSearch }) {
  return (
    <main className="movies">
      <div className="header">
        <img
            className="logo-tartaruga"
            src="..\img\pedro.png"
          />
        <div className="title-home">
          <h1>O Movies</h1>
        </div>
        <div className="links-input">
          <nav className="links">
            <li>POST-APOCALYPTIC</li>
            <li>SERIES</li>
            <li>SUPERHERO</li>
          </nav>
          <input
            type="text"
            placeholder="Search for a movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="card">
            <Link to={`/Details/${movie.id}`}>
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
