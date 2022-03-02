import { getSession } from "@auth0/nextjs-auth0";

/**
 * Checks if the session user has the passed in role
 * @param {*} user User object from the current session
 * @param {*} role
 * @returns `boolean`
 */
export const isAuthorized = (user, role) => {
  console.log("🚀 ~ file: auth.js ~ line 10 ~ isAuthorized ~ user", user);
  console.log("🚀 ~ file: auth.js ~ line 4 ~ isAuthorized ~ role", role);
  return (
    user &&
    user[process.env.NEXT_PUBLIC_AUTH0_NAMESPACE + "/roles"].includes(role)
  );
};

// export const withAuth = (getData) => (role) => async ({ req, res }) => {
//   const session = await auth0.getSession(req);
//   if (
//     !session ||
//     !session.user ||
//     (role && !isAuthorized(session.user, role))
//   ) {
//     res.writeHead(302, {
//       Location: "/api/v1/login",
//     });
//     res.end();
//     return { props: {} };
//   }

//   const data = getData ? await getData({ req, res }, session.user) : {};

//   return { props: { user: session.user, ...data } };
// };

// export const withAuthSSR = ({ req, res }) => {
//   const session = getSession(req, res);
//   const role =
//     session?.user[process.env.NEXT_PUBLIC_AUTH0_NAMESPACE + "/roles"][0];
//   if (
//     !session ||
//     !session.user ||
//     (role && !isAuthorized(session.user, role))
//   ) {
//     // if not logged in, no admin role here
//     return {
//       redirect: {
//         destination: "/api/auth/login",
//         permanent: false,
//       },
//     };
//   }
// };

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     const session = getSession(ctx.req, ctx.res);
//     const role = session?.user[`https://junpil-portfolio.com/roles`][0];

//     if (
//       !session ||
//       !session.user ||
//       (role && !isAuthorized(session.user, role))
//     ) {
//       return {
//         redirect: {
//           destination: "/api/auth/login",
//           permanent: false,
//         },
//       };
//     }

//     console.log("goes here?");
//     return { props: { user: session.user, ...data } };
//   },
// });
