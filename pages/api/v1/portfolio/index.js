import { getAccessToken } from "@auth0/nextjs-auth0";
import PortfolioApi from "@lib/api/portfolio";

export default async function createPortfolio(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const data = req.body;
    const json = await new PortfolioApi(accessToken).createPortfolio(data);
    return res.json(json.data);
  } catch (error) {
    return res.status(error.status || 422).json(error.response.data);
  }
}
