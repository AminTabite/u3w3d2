import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";
import { Article } from "../types/interfaceArticle";
import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [fullarticle, setFullarticle] = useState<Article | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = () => {
      fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Caricamento articolo fallito");
          }
        })
        .then((data) => {
          console.log(data, "articolo specifico");
          setFullarticle(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err, "caricamento fallito");
          setLoading(false);
        });
    };

    if (id) {
      getDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="info" />
      </Container>
    );
  }

  if (!fullarticle) {
    return (
      <Container className="text-center mt-5">
        <p>Articolo non trovato o errore di caricamento.</p>
        <Button onClick={() => navigate("/")} variant="primary">
          Torna alla Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Img variant="top" src={fullarticle.image_url} />
            <Card.Body>
              <Card.Title>{fullarticle.title}</Card.Title>
              <Card.Text>
                **Sito di provenienza:** {fullarticle.news_site}
              </Card.Text>
              <Card.Text>
                **Data di pubblicazione:**{" "}
                {fullarticle.published_at.slice(0, 10)}
              </Card.Text>
              <Card.Text>{fullarticle.summary}</Card.Text>
              <Button onClick={() => navigate("/")} variant="primary">
                Torna indietro
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
