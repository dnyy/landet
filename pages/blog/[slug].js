import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import BlogApi from "@lib/api/blogs";
import { Col, Row } from "reactstrap";
import { SlateView } from "slate-simple-editor";
import Avatar from "@components/shared/Avatar";

const BlogDetails = ({ blog, author }) => {
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} isLoading={isLoading}>
      <BasePage
        title={`${blog.title} - Nedre Sundet`}
        className="slate-container"
        metaDescription={blog.subTitle}
      >
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Avatar
              image={author.picture}
              title={author.name}
              date={blog.createdAt}
            />
            <hr />
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await new BlogApi().getAll();
  // const blogs = json.data;
  const paths = data.map(({ blog }) => ({ params: { slug: blog.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const json = await new BlogApi().getBySlug(params.slug);
  return {
    props: { blog: json.data.blog, author: json.data.author },
    revalidate: 1,
  };
}

export default BlogDetails;
