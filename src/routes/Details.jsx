import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const Details = ({ movies }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setMovie(response.data);

        // Fetch related movies
        const relatedResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar`,
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setRelatedMovies(relatedResponse.data.results);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const yearMovie = movie.release_date.split("-")[0];

  return (
    <main className="details-movie">
      <div className="title">
        <img
          className="logo-tartaruga"
          src="..\img\pedro.png"
        />
        <Link to={"/"}>
          <h1 className="logo">O Movies</h1>
        </Link>
        <p className="title-span">/ {movie.title}</p>
      </div>
      <div className="info-movie">
        <img
          className="poster-details"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="info">
          <h2>{yearMovie}</h2>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>

      <div className="other-movies">
        <h2 className="related">Related</h2>
        <div className="related-movies-list">
          {relatedMovies.map((relatedMovie) => (
            <div key={relatedMovie.id} className="related-movie-item">
              <Link to={`/Details/${relatedMovie.id}`}>
                <img
                  className="related-movie-poster"
                  src={`https://image.tmdb.org/t/p/w200/${relatedMovie.poster_path}`}
                  alt={relatedMovie.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Details;
