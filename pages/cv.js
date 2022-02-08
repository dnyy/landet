import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";

const Cv = () => {
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} isLoading={isLoading}>
      <BasePage>
        <h1>Im CV</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Cv;
