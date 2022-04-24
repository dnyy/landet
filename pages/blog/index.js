import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import Masthead from "@components/shared/Masthead";
import { Col, Row } from "reactstrap";
import BlogApi from "@lib/api/blogs";
import BlogItem from "@components/BlogItem";

const Blog = ({ blogs }) => {
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={user}
      loading={isLoading}
    >
      <Masthead imagePath="/images/lake.jpg">
        <h1>Bloggen</h1>
        <span className="subheading">Nyheter om landet</span>
      </Masthead>
      <BasePage title="Nyheter - Nedre Sundet" className="blog-body">
        <Row>
          {blogs.map((blog) => (
            <Col key={blog._id} md="10" lg="8" className="mx-auto">
              <BlogItem blog={blog} />
              <hr></hr>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

/**
 * fetches data at build time only
 * get statically generated and fast load times
 * good for SEO
 */
export async function getStaticProps() {
  const { data } = await new BlogApi().getAll();
  const blogs = data.map((item) => ({ ...item.blog, author: item.author }));
  return {
    props: { blogs },
    revalidate: 1,
  };
}

export default Blog;
