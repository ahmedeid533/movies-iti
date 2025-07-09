"use client";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import "./styles/HomePage.css";

export default function Home() {
	const { language } = useSelector((state) => state.languages) || "en";
	const { data: session } = useSession();
	const navigate = useRouter();

	// Translated text
	const welcomeText = language === "ar"
		? "اكتشف عالم السينما والترفيه"
		: "Discover the World of Cinema & Entertainment";

	const heroSubtitle = language === "ar"
		? "منصة شاملة لاستكشاف الأفلام والمسلسلات مع ميزات متقدمة لإدارة قوائم المشاهدة المفضلة"
		: "Your comprehensive platform for discovering movies and TV shows with advanced features for managing your favorite watchlists";

	const featuresTitle = language === "ar" ? "لماذا تختار تطبيقنا؟" : "Why Choose Our Platform?";
	const exploreMoviesText = language === "ar" ? "استكشف الأفلام" : "Explore Movies";
	const exploreShowsText = language === "ar" ? "استكشف المسلسلات" : "Explore TV Shows";
	const loginPromptText = language === "ar" ? "سجل الدخول لحفظ مفضلاتك" : "Login to Save Your Favorites";

	const features = [
		{
			icon: "🎬",
			title: language === "ar" ? "مكتبة ضخمة" : "Vast Library",
			description: language === "ar"
				? "آلاف الأفلام والمسلسلات من جميع أنحاء العالم"
				: "Thousands of movies and TV shows from around the world"
		},
		{
			icon: "⭐",
			title: language === "ar" ? "تقييمات موثوقة" : "Trusted Ratings",
			description: language === "ar"
				? "تقييمات دقيقة من مجتمع المشاهدين العالمي"
				: "Accurate ratings from the global movie community"
		},
		{
			icon: "💾",
			title: language === "ar" ? "قوائم مخصصة" : "Personal Watchlists",
			description: language === "ar"
				? "احفظ مفضلاتك وشاركها مع الأصدقاء"
				: "Save your favorites and share them with friends"
		},
		{
			icon: "🌐",
			title: language === "ar" ? "دعم متعدد اللغات" : "Multi-language Support",
			description: language === "ar"
				? "واجهة بعدة لغات لتجربة أفضل"
				: "Interface in multiple languages for better experience"
		}
	];

	return (
		<div className="home-page">
			{/* Hero Section */}
			<section className="hero-section">
				<Container>
					<Row className="align-items-center min-vh-75">
						<Col lg={6} className="hero-content">
							<h1 className="hero-title">{welcomeText}</h1>
							<p className="hero-subtitle">{heroSubtitle}</p>

							<div className="hero-actions">
								{!session && (
									<div className="login-prompt mb-4">
										<p className="text-muted mb-3">{loginPromptText}</p>
									</div>
								)}

								<div className="action-buttons">
									<Button
										variant="warning"
										size="lg"
										className="me-3 mb-3 hero-btn"
										onClick={() => navigate.push('/MoviesList')}
									>
										<i className="fa-solid fa-film me-2"></i>
										{exploreMoviesText}
									</Button>

									<Button
										variant="outline-warning"
										size="lg"
										className="mb-3 hero-btn"
										onClick={() => navigate.push('/tv')}
									>
										<i className="fa-solid fa-tv me-2"></i>
										{exploreShowsText}
									</Button>
								</div>
							</div>
						</Col>

						<Col lg={6} className="hero-visual">
							<div className="hero-image-container">
								<div className="floating-cards">
									<div className="movie-card-float card-1">
										<div className="card-content">
											<div className="card-image">
												<img src="https://image.tmdb.org/t/p/w500//6WxhEvFsauuACfv8HyoVX6mZKFj.jpg" alt="Movie 1" />
											</div>
											<div className="card-info">
												<div className="card-title"></div>
												<div className="card-rating">
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
												</div>
											</div>
										</div>
									</div>

									<div className="movie-card-float card-2">
										<div className="card-content">
											<div className="card-image">
												<img src="https://image.tmdb.org/t/p/w500//2XDQa6EmFHSA37j1t0w88vpWqj9.jpg" alt="Movie 2" />
											</div>
											<div className="card-info">
												<div className="card-title"></div>
												<div className="card-rating">
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-regular fa-star text-warning"></i>
												</div>
											</div>
										</div>
									</div>

									<div className="movie-card-float card-3">
										<div className="card-content">
											<div className="card-image">
												<img src="https://image.tmdb.org/t/p/w500//q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg" alt="Movie 3" />
											</div>
											<div className="card-info">
												<div className="card-title"></div>
												<div className="card-rating">
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
													<i className="fa-solid fa-star text-warning"></i>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Features Section */}
			<section className="features-section py-5">
				<Container>
					<Row>
						<Col lg={12} className="text-center mb-5">
							<h2 className="features-title">{featuresTitle}</h2>
						</Col>
					</Row>

					<Row>
						{features.map((feature, index) => (
							<Col md={6} lg={3} key={index} className="mb-4">
								<Card className="feature-card h-100 text-center">
									<Card.Body>
										<div className="feature-icon">{feature.icon}</div>
										<Card.Title className="feature-title">{feature.title}</Card.Title>
										<Card.Text className="feature-description">
											{feature.description}
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Statistics Section */}
			<section className="stats-section py-5">
				<Container>
					<Row className="text-center">
						<Col md={4} className="mb-4">
							<div className="stat-item">
								<div className="stat-number">50K+</div>
								<div className="stat-label">
									{language === "ar" ? "الأفلام" : "Movies"}
								</div>
							</div>
						</Col>
						<Col md={4} className="mb-4">
							<div className="stat-item">
								<div className="stat-number">10K+</div>
								<div className="stat-label">
									{language === "ar" ? "المسلسلات" : "TV Shows"}
								</div>
							</div>
						</Col>
						<Col md={4} className="mb-4">
							<div className="stat-item">
								<div className="stat-number">1M+</div>
								<div className="stat-label">
									{language === "ar" ? "المستخدمين" : "Users"}
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Call to Action Section */}
			<section className="cta-section py-5">
				<Container>
					<Row className="text-center">
						<Col lg={8} className="mx-auto">
							<h3 className="cta-title">
								{language === "ar"
									? "ابدأ رحلتك السينمائية اليوم"
									: "Start Your Cinematic Journey Today"}
							</h3>
							<p className="cta-description">
								{language === "ar"
									? "انضم إلى ملايين المستخدمين واكتشف أفضل الأفلام والمسلسلات"
									: "Join millions of users and discover the best movies and TV shows"}
							</p>
							<div className="cta-buttons">
								<Button
									variant="warning"
									size="lg"
									className="me-3 mb-3"
									onClick={() => navigate.push('/MoviesList')}
								>
									{language === "ar" ? "تصفح الأفلام" : "Browse Movies"}
								</Button>
								<Button
									variant="outline-light"
									size="lg"
									className="mb-3"
									onClick={() => navigate.push('/tv')}
								>
									{language === "ar" ? "تصفح المسلسلات" : "Browse TV Shows"}
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
}
