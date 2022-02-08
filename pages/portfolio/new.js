import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Col, Row } from "reactstrap";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import PortfolioForm from "@components/PortfolioForm";
import { useCreatePortfolio } from "@actions/portfolio";
import Redirect from "@components/shared/Redirect";

const PortfolioNew = ({ user, isLoading }) => {
  // const { user, error, isLoading } = useUser();
  const [createPortfolio, { data, loading, error }] = useCreatePortfolio();

  if (data) {
    return <Redirect to="/portfolio" />;
  }

  return (
    <BaseLayout user={user} isLoading={isLoading}>
      <BasePage header="Create Portfolio">
        <Row>
          <Col md="8">
            <PortfolioForm onSubmit={createPortfolio} />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default PortfolioNew;
export const getServerSideProps = withPageAuthRequired();
