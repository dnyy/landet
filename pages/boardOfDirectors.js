import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import Redirect from "@components/shared/Redirect";

const BoardOfDirectors = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Redirect to="/api/auth/login" />;
  } else {
    return (
      <BaseLayout user={user} isLoading={isLoading}>
        <BasePage title="Styrelsen">
          <h1>Im BoardOfDirectors</h1>
        </BasePage>
      </BaseLayout>
    );
  }
};

export default BoardOfDirectors;
// export const getServerSideProps = withPageAuthRequired({
//   returnTo: '/foo',
//   async getServerSideProps(ctx) {
//     // access the user session
//     const session = getSession(ctx.req, ctx.res);
//     return { props: { customProp: 'bar' } };
//   }
// });
export const getServerSideProps = withPageAuthRequired();
