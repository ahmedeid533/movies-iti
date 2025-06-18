"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import axiosInstance from '../../apis/config'; // Adjust the path to where axiosInstance is located
import Recommendations from '../../recommendations/recommendations';
import Reviews from '../../reviews/reviews';
import { Rating } from 'primereact/rating';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import  "../MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}`)
      .then(result => setMovie(result.data))
      .catch(error => console.error("Error fetching movie details:", error));
  }, [id]);

  return (
    <div className={"container"}>
      {movie && (
        <div className={"wrapper"}>
          <div className={"left"}>
            <img
              className={"poster"}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className={"right"}>
            <h1 className={"title"}>{movie.title}</h1>
            <p className={"date"}>{new Date(movie.release_date).toLocaleDateString()}</p>

            <div className={"rating"}>
              <Rating value={movie.vote_average / 2} readOnly cancel={false} stars={5} />
              <span className={"vote"}>{movie.vote_average.toFixed(1)}</span>
            </div>

            <p className={"overview"}>{movie.overview}</p>

            <div className={"genres"}>
              {movie.genres.map((genre) => (
                <span key={genre.id} className={"genreItem"}>
                  {genre.name}
                </span>
              ))}
            </div>

            <div className={"details"}>
              <p><strong>Duration:</strong> {movie.runtime} min</p>
              <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
            </div>

            <div className={"production"}>
              {movie.production_companies.map(company => (
                company.logo_path && (
                  <div key={company.id} className={"company"}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${company.logo_path}`}
                      alt={company.name}
                    />
                    <p>{company.name}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      <Reviews movieId={id} />
      <Recommendations movieId={id} />
    </div>
  );
};

export default MovieDetails;