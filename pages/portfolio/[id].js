import BaseLayout from "../../components/layouts/BaseLayout";
import axios from "axios";
import { useRouter } from "next/router";

const PortfolioDetails = ({ portfolio }) => {
  return (
    <BaseLayout>
      <h1>details</h1>
      <h2>{portfolio.title}</h2>
    </BaseLayout>
  );
};

PortfolioDetails.getInitialProps = async ({ query }) => {
  let post = {};
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${query.id}`
    );
    post = res.data;
  } catch (error) {
    console.error("cannot fetch post", error.message);
  }

  return { portfolio: post };
};

export default PortfolioDetails;
