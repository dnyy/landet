import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(function Secret(req, res) {
  const session = getSession(req, res);
  const user = session.user;
  res.json({ protected: "secret reoute here", id: user.sub });
});
