import { useUser } from "@auth0/nextjs-auth0";
import { Container, Row, Col } from "reactstrap";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { useGetUser, useGetUsers } from "@actions/user";
import UsersApi from "@lib/api/users";
import BlogsApi from "@lib/api/blogs";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { isAuthorized } from "utils/auth";
import Landing from "./landing";
import Avatar from "@components/shared/Avatar";

const Home = ({ blogs, users, data }) => {
  console.log("🚀 ~ file: index.js ~ line 15 ~ Home ~ data", data);
  // console.log("🚀 ~ file: index.js ~ line 15 ~ Home ~ users", users);
  const { user, error, isLoading } = useUser();

  const landingImage = "/images/ns-landing.jpeg";

  return (
    <>
      <BaseLayout
        user={user}
        isLoading={isLoading}
        navClass="transparent"
        className="cover cover-blue"
        navBorder="none"
      >
        {isAuthorized(user, "admin") ? (
          <BasePage indexPage title="Nedre Sundet">
            <div className="main-section">
              {/* <div className="background-image">
            <Image
              src="/images/background-index.png"
              alt="background image"
              width={1548}
              height={500}
            />
          </div> */}
              <Container>
                <Row>
                  <Col md="6" className="hero-welcome-wrapper">
                    <div className="hero-welcome-text">
                      <h1>
                        Funderar över innehåll här. Kan tänka mig en överblick
                        om vilka hushåll/personer som är på landet
                      </h1>
                    </div>
                    <div className="hero-welcome-bio">
                      <h1>Kankse någon slags inchecking.</h1>
                    </div>
                    <div className="hero-welcome-text">
                      <h1>
                        Typ en lista med alla namn samt en röd eller grön
                        checkbox
                      </h1>
                    </div>
                  </Col>
                  <Col md="6" className="hero-welcome-wrapper">
                    <div className="hero-welcome-text">
                      {data.map((user) => (
                        <Avatar
                          key={user.user_id}
                          image={user.picture}
                          title={user.name}
                        />
                      ))}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </BasePage>
        ) : (
          <Landing imagePath={"/images/ns-landing.jpeg"} />
        )}
      </BaseLayout>
    </>
  );
};

export async function getStaticProps() {
  // const { data } = await new BlogsApi().getAll();
  const { data } = await new UsersApi().getAll();
  // const blogs = data.map((item) => ({ ...item.blog, author: item.author }));
  return {
    props: { data },
    revalidate: 1,
  };
}

export default Home;
