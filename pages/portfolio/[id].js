import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { useGetPostById } from "@actions/index";
import { useRouter } from "next/router";

const PortfolioDetails = () => {
  const router = useRouter();
  const { data, error, loading } = useGetPostById(router.query.id);
  return (
    <BaseLayout>
      <BasePage>
        <h1>Details</h1>
        {loading && <p>Loading...</p>}
        {data && <h2>{data.title}</h2>}
        {error && <div className="alert alert-danger">{error.message}</div>}
      </BasePage>
    </BaseLayout>
  );
};

export default PortfolioDetails;
