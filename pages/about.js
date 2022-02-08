import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";

const About = () => {
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} isLoading={isLoading}>
      <BasePage header="About">{/* <h1>Im about</h1> */}</BasePage>
    </BaseLayout>
  );
};

export default About;
