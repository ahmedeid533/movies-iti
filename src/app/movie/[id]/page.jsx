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

    // Helper function to format date safely
    const getFormattedDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    };

    return (
      <div className="movie-details-container">
      {movie && (
          <div className="movie-details-wrapper">
              <div className="movie-details-left">
            <img
                className="movie-details-poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
            <div className="movie-details-right">
                <h1 className="movie-details-title">{movie.title}</h1>
                <p className="movie-details-date">{getFormattedDate(movie.release_date)}</p>

              <div className="movie-details-rating">
              <Rating value={movie.vote_average / 2} readOnly cancel={false} stars={5} />
                <span className="movie-details-vote">{movie.vote_average.toFixed(1)}</span>
            </div>

              <p className="movie-details-overview">{movie.overview}</p>

              <div className="movie-details-genres">
                  {movie.genres && movie.genres.map((genre) => (
                      <span key={genre.id} className="movie-details-genre-item">
                  {genre.name}
                </span>
              ))}
            </div>

              <div className="movie-details-info">
                  <p><strong>Duration:</strong> {movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
                  <p>
                      <strong>Language:</strong> {movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}
                  </p>
            </div>

              <div className="movie-details-production">
                  {movie.production_companies && movie.production_companies.map(company => (
                company.logo_path && (
                    <div key={company.id} className="movie-details-company">
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
