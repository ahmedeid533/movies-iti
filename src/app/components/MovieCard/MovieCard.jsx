// Add this at the very top of the file
"use client";

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react"; // Import useSession for session management
import Link from "next/link"; // Correct: Link is a default export
import { Card } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaHeart } from "react-icons/fa";
import {
	addToWishlist,
	removeFromWishlsit,
} from "@/store/slices/WishListSlice";
import "react-circular-progressbar/dist/styles.css";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
	const dispatch = useDispatch();
	const { data: session } = useSession()
	const wishlist = useSelector((state) => state.wishlist.value || []);
	const isLiked = wishlist.some((item) => item.id === movie.id);

	// State to ensure client-side-only logic runs after hydration
	const [isClient, setIsClient] = useState(false);

	const removeFromWishlsit_ = async (email, movieId) => {
		try {
			const response = await fetch(`/api/wishlist`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					movieId: movieId,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to remove movie from wishlist");
			}
			const data = await response.json();
			console.log("Movie removed from wishlist:", data);
			setWishlist(data?.wishlist || []); // Update wishlist state
		} catch (error) {
			console.error("Error removing movie from wishlist:", error);
		}
	};
	const addToDb = async (movie) => {
		console.log("Adding movie to wishlist in DB:", movie);
		console.log("User email:", session?.user?.email);
		try {
			const response = await fetch("/api/wishlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: session.user.email,
					movie: movie,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to add movie to wishlist");
			}
			return await response.json();
		} catch (error) {
			console.error("Error adding movie to wishlist:", error);
		}
	}

	useEffect(() => {
		if (session)
			setIsClient(true);
		console.log("session ==> ", session);
		
	}, [session]);

	const handleLike = (e) => {
		e.preventDefault(); // Prevent link click
		if (isLiked) {
			dispatch(removeFromWishlsit(movie));
			removeFromWishlsit_(session.user.email, movie.id);
		} else {
			dispatch(addToWishlist({ ...movie, type: "movie" }));
			addToDb(movie);
		}
	};

	return (
		<>
			{movie && movie.poster_path && (
				<Link href={movie ? `/movie/${movie.id}` : "#"}>
					<Card className="movieCard shadow-sm">
						<div className="posterWrapper">
							<Card.Img
								variant="top"
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
								alt={movie.title || "Movie Poster"}
								className="cardImg"
							/>
							<div className="ratingCircle">
								<CircularProgressbar
									value={movie.vote_average * 10 || 0}
									text={
										`${Math.round(
											movie.vote_average * 10
										)}%` || "N/A"
									}
									styles={buildStyles({
										textSize: "30px",
										textColor: "#fff",
										pathColor: "#21d07a",
										trailColor: "#204529",
									})}
								/>
							</div>
							{/* Only render the heart icon on the client after mounting */}
							{isClient && (
								<FaHeart
									className={`heartIcon ${
										isLiked ? "liked" : ""
									}`}
									onClick={handleLike}
									aria-label={
										isLiked
											? "Remove from wishlist"
											: "Add to wishlist"
									}
								/>
							)}
						</div>
						<Card.Body>
							{/* Note: I've restored your commented-out title and date logic */}
							<Card.Title className="fs-6 head">
								{movie.title}
							</Card.Title>
							{isClient && (
								<Card.Text className="text-muted">
									{new Date(
										movie.release_date
									).toLocaleDateString("en-US", {
										month: "short",
										day: "2-digit",
										year: "numeric",
									})}
								</Card.Text>
							)}
						</Card.Body>
					</Card>
				</Link>
			)}
		</>
	);
};

export default MovieCard;
