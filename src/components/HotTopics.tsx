import { useState, useEffect, useNavigate } from "react";
import { Container, Row, Col, Spinner, Card, Button } from "react-bootstrap";
import { Article } from "../types/interfaceArticle";
import { Link, Navigate } from "react-router-dom";

const HotTopics = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const endpoint: string = "https://api.spaceflightnewsapi.net/v4/articles";

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    fetch(endpoint)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("caricamento articoli fallito");
        }
      })
      .then((data) => {
        console.log(data.results, "articoli spaziali");
        setArticles(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log("errore", err);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={10} className="text-center">
          <h1>Ecco la nostra selezione di articoli</h1>
        </Col>
      </Row>

      <Row className="mt-4">
        {loading ? (
          <Col xs={12} className="text-center">
            <Spinner animation="border" variant="info" />
          </Col>
        ) : (
          articles.map((a) => (
            <Col key={a.id} xs={12} md={6} xl={4} className="mb-4 d-flex">
              <Link
                to={`/details/${a.id}`}
                className="text-decoration-none text-body">
                <Card className="flex-grow-1">
                  <div>
                    {" "}
                    <Card.Img
                      className="fluid"
                      variant="top"
                      src={a.image_url}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{a.title}</Card.Title>
                    <Card.Text>{a.published_at.slice(-0, 10)}</Card.Text>
                    <Card.Text>{a.news_site}</Card.Text>
                    <Card.Text>{a.summary}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HotTopics;
