import Link from "next/link";
import { Button, Col, Container, Row } from "reactstrap";

const LoginLink = () => (
  <Link href="/api/auth/login">
    {/* <a>Logga in</a> */}
    <Button color="light" size="lg" block outline>
      Logga in
    </Button>
  </Link>
);

const Landing = ({ imagePath, children }) => (
  <div className="landing" style={{ backgroundImage: `url(${imagePath})` }}>
    <div className="overlay"></div>
    <Container fluid>
      <Col className="buttonWrapper m-auto">{/* <LoginLink /> */}</Col>
    </Container>
  </div>
);

export default Landing;
