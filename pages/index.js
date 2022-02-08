import { useUser } from "@auth0/nextjs-auth0";
import { Container, Row, Col } from "reactstrap";
import BaseLayout from "@components/layouts/BaseLayout";
import { useGetUser } from "@actions/user";
import Image from "next/image";

const Home = () => {
  const { user, error, isLoading } = useUser();
  const { data } = useGetUser();
  return (
    <BaseLayout
      user={user}
      isLoading={isLoading}
      navClass="transparent"
      className="cover"
    >
      <div className="main-section">
        <div className="background-image">
          <Image
            src="/images/background-index.png"
            alt="background image"
            width={1548}
            height={500}
          />
        </div>
        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper`}>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Nedre Sundet </h2>
                      <div className="hero-section-content-intro">
                        Lite text.
                      </div>
                    </div>
                    <Image
                      src="/images/section-1.png"
                      alt="section image"
                      width={465}
                      height={619}
                    />
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  Välkommen till Nedre Sundet. Läs om de senaste nyheterna och
                  vad som är på gång, håll koll på vem som är på plats osv.
                </h1>
              </div>
              <div className="hero-welcome-bio">
                <h1>bla bla sommar.</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Home;
