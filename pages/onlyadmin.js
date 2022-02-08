import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";

const OnlyAdmin = () => {
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} isLoading={isLoading}>
      <BasePage>
        <h1>im admin</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default OnlyAdmin;
export const getServerSideProps = withPageAuthRequired();
