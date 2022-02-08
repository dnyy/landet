// import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import withAuth from "@hoc/withAuth";

//props from hoc instead
const Dashboard = ({ user, loading }) => {
  // const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header="Dashboard">{<h1>Im dashboard</h1>}</BasePage>
    </BaseLayout>
  );
};

export default withAuth(Dashboard)("admin");
