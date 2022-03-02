import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import BlogApi from "@lib/api/blogs";
import { Col, Row } from "reactstrap";
import { SlateView } from "slate-simple-editor";

const BlogDetails = ({ blog }) => {
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} isLoading={isLoading}>
      <BasePage className="slate-container">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const json = await new BlogApi().getAll();
  const blogs = json.data;
  const paths = blogs.map((b) => ({ params: { slug: b.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const json = await new BlogApi().getBySlug(params.slug);
  return { props: { blog: json.data } };
}

export default BlogDetails;
