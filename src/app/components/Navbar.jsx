"use client";
import React from "react";
import "../styles/Navbar.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/slices/languageSlice";
import LoginButton from "@/components/LoginButton";

// 1. Import the Dropdown component from react-bootstrap
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
	const MoviesWishlist =
		useSelector((state) =>
			state.wishlist.value.filter((item) => item.type == "movie")
		) || [];
	const ShowsWishlist =
		useSelector((state) =>
			state.wishlist.value.filter((item) => item.type == "show")
		) || [];

	const dispatch = useDispatch();
	const { language } = useSelector((state) => state.languages);

	const handleLanguageChange = (e) => {
		dispatch(setLanguage(e.target.value));
	};

	return (
		<>
			<nav className={`navbar navbar-expand-lg text-center ${"navbar"}`}>
				<div className="container">
					<Link
						className="navbar-brand fw-bold ms-4"
						href={"/MoviesList"}
					>
						Movie App
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className={` navbar-collapse ${""}`} id="navbarNav">
						<ul className="navbar-nav ms-auto me-4">
							<li className="nav-item mx-1">
								<LoginButton />
							</li>
							<li className="nav-item mx-1">
								<Link
									className="nav-link fw-semibold "
									href="/MoviesList"
								>
									Movies
								</Link>
							</li>
							<li className="nav-item mx-1">
								<Link
									className="nav-link fw-semibold "
									href="/tv"
								>
									TV Shows
								</Link>
							</li>

							{/* === START: The Fixed Dropdown === */}
							<Dropdown as="li" className="nav-item">
								{/* 2. Dropdown.Toggle handles the click event. No more data-bs-* attributes needed. */}
								<Dropdown.Toggle
									as="a"
									className="nav-link dropdown-toggle fw-semibold"
									role="button"
								>
									<i className="fa-solid fa-heart me-1 fs-5"></i>{" "}
									Wishlist
								</Dropdown.Toggle>

								{/* 3. Dropdown.Menu is the container for the links. */}
								<Dropdown.Menu className="p-2">
									{/* 4. Wrap each Link in a Dropdown.Item for correct styling and behavior. */}
									<Dropdown.Item as="div">
										<Link
											href="/movies/wishlist"
											className="nav-link fw-semibold"
										>
											<span>
												Wishlist Page
												<sup className="ms-1 bg-light py-1 px-2 rounded-2">
													{/* 5. Used your actual Redux state variable */}
													{MoviesWishlist.length + ShowsWishlist.length}
												</sup>
											</span>
										</Link>
									</Dropdown.Item>
									{/* <Dropdown.Item as="div">
										<Link
											href="/tv/wishlist"
											className="nav-link fw-semibold"
										>
											<span>
												TV Shows
												<sup className="ms-1 bg-light py-1 px-2 rounded-2">
													{ShowsWishlist.length}
												</sup>
											</span>
										</Link>
									</Dropdown.Item> */}
								</Dropdown.Menu>
							</Dropdown>
							{/* === END: The Fixed Dropdown === */}
						</ul>
					</div>
					<Form.Group>
						<Form.Select
							value={language}
							onChange={handleLanguageChange}
							className={"languageSelect"}
						>
							<option value="en">English</option>
							<option value="ar">Arabic</option>
							<option value="fr">Français</option>
							<option value="zh">中文</option>
						</Form.Select>
					</Form.Group>
				</div>
			</nav>
		</>
	);
}
