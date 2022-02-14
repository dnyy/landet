import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import withAuth from "hoc/withAuth";

const BlogEditor = ({ user, loading }) => {
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header="Blog Editor">{<h1>Im BlogEditor</h1>}</BasePage>
    </BaseLayout>
  );
};

// props coming from HOC
export default withAuth(BlogEditor)("admin");
