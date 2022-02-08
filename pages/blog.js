import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";

const Blog = () => {
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} isLoading={isLoading}>
      <BasePage>
        <h1>Im Blog</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Blog;
