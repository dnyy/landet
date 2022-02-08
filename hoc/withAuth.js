import Redirect from "@components/shared/Redirect";
import { isAuthorized } from "utils/auth";
import { useGetUser } from "@actions/user";
import { useUser } from "@auth0/nextjs-auth0";

const withAuth = (Component) => (role) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // const { data, loading } = useGetUser();
    const { user, error, isLoading } = useUser();

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      return <Redirect ssr to="/api/auth/login" />;
    } else {
      if (role && !isAuthorized(user, role)) {
        return <Redirect ssr to="/api/auth/login" />;
      }

      return <Component user={user} loading={isLoading} {...props} />;
    }
  };
};

export default withAuth;
