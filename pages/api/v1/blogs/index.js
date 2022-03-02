import BlogApi from "@lib/api/blogs";
import { getAccessToken } from "@auth0/nextjs-auth0";

export default async function createBlog(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const data = req.body;
    const json = await new BlogApi(accessToken).create(data);
    return res.json(json.data);
  } catch (error) {
    return res.status(error.status || 422).json(error.response.data);
  }
}
