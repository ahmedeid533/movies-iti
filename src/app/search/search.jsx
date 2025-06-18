"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../apis/config";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Rating } from "primereact/rating";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./searchpage.css";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  console.log("query ==> ", query);
  const [results, setResults] = useState([]);
  const { language } = useSelector((state) => state.languages);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const movieResult = await axiosInstance.get("/search/movie", {
          params: {
            query: encodeURIComponent(query),
          },
        });

        const tvResult = await axiosInstance.get("/search/tv", {
          params: {
            query: encodeURIComponent(query),
          },
        });

        // Debugging: Log the API response to check language
        console.log("Movie API Response:", movieResult.data);
        console.log("TV API Response:", tvResult.data);

        const transformMovies = movieResult.data.results.map((movie) => ({
          ...movie,
          media_type: "movie",
        }));
        const transformTvShows = tvResult.data.results.map((show) => ({
          ...show,
          title: show.name,
          media_type: "tvShow",
        }));

        const combinedResults = [...transformMovies, ...transformTvShows].sort(
          (a, b) => b.popularity - a.popularity
        );

        setResults(combinedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) fetchSearchResults();
  }, [query,language]);

  const handleViewDetails = (id) => {
    console.log(`View details for item ${id}`);
  };

	return (

    <Container className="my-4">
      <h2 className="mb-4">Recommendations</h2>
      <Row>
        {results.map((item) => (
          <Col
            key={`${item.media_type}-${item.id}`}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            className="mb-4"
          >
            <Card className={`${"movieCard"} shadow-sm h-100`}>
              <div className={"posterWrapper"}>
                <Card.Img
                  variant="top"
                  src={
                    item.poster_path
                      ? `${"https://image.tmdb.org/t/p/w500"}/${item.poster_path}`
                      : "path/to/placeholder-image.jpg"
                  }
                  alt={item.title}
                  className={"cardImg"}
                />
                <div className={"ratingCircle"}>
                  <CircularProgressbar
                    value={(item.vote_average || 0) * 10}
                    text={`${Math.round((item.vote_average || 0) * 10)}%`}
                    styles={buildStyles({
                      textSize: "30px",
                      textColor: "#fff",
                      pathColor: "#21d07a",
                      trailColor: "#204529",
                    })}
                  />
                </div>
              </div>
              <Card.Body>
                <Card.Title
                  className="fs-6 mt-3"
                  onClick={() => handleViewDetails(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  {(item.title)?.split(" ").slice(0, 3).join(" ") || "Untitled"}
                </Card.Title>
                <Card.Text className="text-muted">
                  <span className="d-block mb-1">
                    {item.release_date || item.first_air_date
                      ? new Date(
                          item.release_date || item.first_air_date
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : "Date unavailable"}
                  </span>
                  <Rating
                    className={`${"rating"} text-warning my-1`}
                    value={(item.vote_average || 0) / 2}
                    readOnly
                    cancel={false}
                  />
                  <span className="d-block mb-1"></span>
                  <i className="bi d-flex bi-heart text-warning"></i>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResult;