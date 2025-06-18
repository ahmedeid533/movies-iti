"use client";
import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import axiosInstance from '../../apis/config';
import {Rating} from 'primereact/rating';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "../TVDetails.css";

const TVShowDetails = () => {
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Fetch TV show details
        axiosInstance
            .get(`/tv/${id}`)
            .then(result => setShow(result.data))
            .catch(error => console.error("Error fetching TV show details:", error));

      // Fetch recommendations
      axiosInstance
          .get(`/tv/${id}/recommendations`)
          .then(result => setRecommendations(result.data.results || []))
          .catch(error => console.error("Error fetching recommendations:", error));
  }, [id]);

    // Helper function to format year safely
    const getYearFromDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'N/A' : date.getFullYear().toString();
    };

    // Helper function to format full date safely
    const getFormattedDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    };

    return (
        <div className="tv-details-container">
            {show && (
                <div className="tv-details-wrapper">
                    <div className="tv-details-left">
                        <img
                            className="tv-details-poster"
                            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                            alt={show.name}
                        />
                    </div>
                    <div className="tv-details-right">
                        <h1 className="tv-details-title">{show.name}</h1>
                        <p className="tv-details-date">{getFormattedDate(show.first_air_date)}</p>

              <div className="tv-details-rating">
                  <Rating value={show.vote_average / 2} readOnly cancel={false} stars={5}/>
                  <span className="tv-details-vote">{show.vote_average.toFixed(1)}</span>
              </div>

              <p className="tv-details-overview">{show.overview}</p>

              <div className="tv-details-genres">
                  {show.genres.map((genre) => (
                      <span key={genre.id} className="tv-details-genre-item">
                  {genre.name}
                </span>
              ))}
            </div>

              <div className="tv-details-info">
                  <p><strong>Episodes:</strong> {show.number_of_episodes || 'N/A'}</p>
                  <p><strong>Seasons:</strong> {show.number_of_seasons || 'N/A'}</p>
                  <p><strong>Language:</strong> {show.original_language ? show.original_language.toUpperCase() : 'N/A'}
                  </p>
                  <p><strong>Status:</strong> {show.status || 'N/A'}</p>
              </div>

              <div className="tv-details-production">
                  {show.production_companies && show.production_companies.map(company => (
                      company.logo_path && (
                          <div key={company.id} className="tv-details-company">
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

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
            <div className="tv-details-recommendations-section">
                <h2>Recommendations</h2>
                <div className="tv-details-recommendations-grid">
                    {recommendations.slice(0, 6).map(rec => (
                        <div key={rec.id} className="tv-details-rec-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${rec.poster_path}`}
                                alt={rec.name || 'TV Show'}
                                className="tv-details-rec-poster"
                            />
                            <h4>{rec.name || 'Unknown Title'}</h4>
                            <p>{getYearFromDate(rec.first_air_date)}</p>
                        </div>
                    ))}
                </div>
        </div>
      )}
    </div>
  );
};

export default TVShowDetails;
