import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { Row, Col } from "reactstrap";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { useGetPortfolio, useUpdatePortfolio } from "@actions/portfolio";
import PortfolioForm from "@components/PortfolioForm";
import { toast } from "react-toastify";

/**
 * Content specific to the user, NextJS always try/recommends to load it on the client
 */
const PortfolioEdit = () => {
  const router = useRouter();
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const { data: initialData } = useGetPortfolio(router.query.id);

  const _updatePortfolio = async (data) => {
    await updatePortfolio(router.query.id, data);
    toast.success("🎉 Portfolio updated!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const { user, isLoading } = useUser();
  return (
    <BaseLayout user={user} loading={isLoading}>
      <BasePage header="Portfolio Edit">
        <Row>
          <Col md="8">
            {initialData && (
              <PortfolioForm
                onSubmit={_updatePortfolio}
                initialData={initialData}
              />
            )}
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default PortfolioEdit;
