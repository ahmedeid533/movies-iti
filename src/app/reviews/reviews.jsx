
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '../apis/config'; // Adjust the path to where axiosInstance is located
import './Reviews.css';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}/reviews`)
      .then(res => setReviews(res.data.results))
      .catch(err => console.error('Error fetching reviews', err));
  }, [id]);

  return (
    <div className={"container"}>
      <h2 className={"title"}>Reviews</h2>
      {reviews.slice(0, 3).map((review) => (
        <div key={review.id} className={"card"}>
          <div className={"header"}>
            <div className={"avatar"}>{review.author.charAt(0).toUpperCase()}</div>
            <div>
              <p className={"author"}><strong>A review by {review.author}</strong></p>
              <p className={"date"}>
                Written on {new Date(review.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className={"content"}>
            <p>{review.content.split(" ").slice(0, 40).join(" ")}...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
