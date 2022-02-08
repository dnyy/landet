import Link from "next/link";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Row, Col, Button } from "reactstrap";
import { useRouter } from "next/router";
import { useDeletePortfolio } from "@actions/portfolio";
import PortfolioApi from "@lib/api/portfolio";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import PortfolioCard from "@components/PortfolioCard";
import { isAuthorized } from "utils/auth";

const Portfolios = ({ portfolios: initialPortfolios }) => {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const { user, error: userError, isLoading: userIsLoading } = useUser();
  const [deletePortfolio, { data, error }] = useDeletePortfolio();

  const _deletePortfolio = async (e, portfolioId) => {
    e.stopPropagation();
    const isConfirm = confirm("Are sure you want to delete this portfolio?");
    if (isConfirm) {
      await deletePortfolio(portfolioId);
      setPortfolios(portfolios.filter((p) => p._id !== portfolioId));
    }
  };
  return (
    <BaseLayout>
      <BasePage header="Portfolios" className="portfolio-page">
        <Row>
          {portfolios.map((portfolio) => (
            <Col
              md="4"
              key={portfolio._id}
              onClick={() => {
                router.push("/portfolio/[id]", `/portfolio/${portfolio._id}`);
              }}
            >
              <PortfolioCard portfolio={portfolio}>
                {user && isAuthorized(user, "admin") && (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          "/portfolio/[id]/edit",
                          `/portfolio/${portfolio._id}/edit`
                        );
                      }}
                      className="mr-2"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => _deletePortfolio(e, portfolio._id)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </PortfolioCard>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

// static props, good if content not changing ofter
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  return {
    props: { portfolios },
    revalidate: 1,
  };
}

export default Portfolios;
