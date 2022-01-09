import axios from "axios";
import Link from "next/link";
import BaseLayout from "../../components/layouts/BaseLayout";

const Portfolio = ({ posts }) => {
  const renderPosts = () =>
    posts.map((post) => (
      <li key={post.id}>
        <Link href={`/portfolio/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </li>
    ));

  return (
    <BaseLayout>
      <h1>Im Portfolio</h1>
      <ul>{renderPosts()}</ul>
    </BaseLayout>
  );
};

Portfolio.getInitialProps = async () => {
  let posts = [];
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    posts = res.data;
  } catch (error) {
    console.error("cannot fetch posts", error.message);
  }

  return { posts: posts.slice(0, 10) };
};

export default Portfolio;
