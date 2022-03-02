import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import BlogApi from "@lib/api/blogs";

export default async function handleBlog(req, res) {
  if (req.method === "GET") {
    const json = await new BlogApi().getById(req.query.id);
    return res.json(json.data);
  }

  if (req.method === "PATCH") {
    try {
      const { accessToken } = await getAccessToken(req, res);

      const data = req.body;
      const json = await new BlogApi(accessToken).update(
        req.query.id,
        req.body
      );
      return res.json(json.data);
    } catch (error) {
      return res.status(error.status || 422).json(error.response.data);
    }
  }
}
