import { useUser } from "@auth0/nextjs-auth0";
import { Container, Row, Col } from "reactstrap";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { useGetUser } from "@actions/user";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const Home = () => {
  const { user, error, isLoading } = useUser();
  const { data } = useGetUser();
  const [isFlipping, setIsFlipping] = useState(false);
  const flipInterval = useRef();

  // ----- flip effect
  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((previousFlipping) => !previousFlipping);
    }, 20000);
  };
  // ------- end flip effect

  return (
    <BaseLayout
      user={user}
      isLoading={isLoading}
      navClass="transparent"
      className={`cover ${isFlipping ? "cover-orange" : "cover-blue"}`}
    >
      <BasePage indexPage title="Nedre Sundet">
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
                  <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Nedre Sundet </h2>
                        <div className="hero-section-content-intro">
                          Lite text.
                        </div>
                      </div>
                      {/* could use wrapper for ratio fix */}
                      <div className="image image-1">
                        <Image
                          src="/images/section-1-sm.jpg"
                          alt="section image"
                          width={465}
                          height={620}
                        />
                      </div>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Nedre Sundet </h2>
                        <div className="hero-section-content-intro">
                          Lite text.
                        </div>
                      </div>
                      <Image
                        src="/images/section-1-old-sm.jpg"
                        alt="section image"
                        width={465}
                        height={620}
                      />
                      <div className="shadow-custom-orange">
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
      </BasePage>
    </BaseLayout>
  );
};

export default Home;
