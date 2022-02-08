export const isAuthorized = (user, role) => {
  return (
    user &&
    user[process.env.NEXT_PUBLIC_AUTH0_NAMESPACE + "/roles"].includes(role)
  );
};
