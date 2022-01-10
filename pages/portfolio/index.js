import Link from "next/link";
import { useGetPosts } from "@actions/index";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";

const Portfolio = () => {
  const { data, error, loading } = useGetPosts();
  const renderPosts = () =>
    data.map((post) => (
      <li key={post.id}>
        <Link href={`/portfolio/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </li>
    ));

  return (
    <BaseLayout>
      <BasePage>
        <h1>Im Portfolio</h1>
        {loading && <p>Loding data</p>}
        {data && <ul>{renderPosts()}</ul>}
        {error && <div className="alert alert-danger">{error.message}</div>}
      </BasePage>
    </BaseLayout>
  );
};

export default Portfolio;
