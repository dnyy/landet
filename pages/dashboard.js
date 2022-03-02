// import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import Link from "next/link";
import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import Masthead from "@components/shared/Masthead";
import PortDropdown from "@components/shared/Dropdown";
import withAuth from "@hoc/withAuth";
import BlogApi from "@lib/api/blogs";
import { isAuthorized } from "utils/auth";
import { useGetUserBlogs, useUpdateBlog } from "@actions/blogs";
import { toast } from "react-toastify";

//props from hoc instead
const Dashboard = ({ user, loading }) => {
  const [updateBlog] = useUpdateBlog();
  const { data: blogs, mutate } = useGetUserBlogs();

  const changeBlogStatus = async (blogId, status) => {
    try {
      await updateBlog(blogId, { status });
      mutate(); // will refetch useGetUserBlogs
    } catch (error) {
      toast.error("Ooops! Something went wrong...");
    }
    // updateBlog(blogId, { status })
    //   .then(() => mutate())
    //   .catch(() => toast.error("something wnet wring..."));
  };

  const createOption = (blogStatus) => {
    return blogStatus === "draft"
      ? { view: "Publish Story", value: "published" }
      : { view: "Make a Draft", value: "draft" };
  };

  const createOptions = (blog) => {
    const option = createOption(blog.status);

    return [
      {
        key: `${blog._id}-published`,
        text: option.view,
        handlers: {
          onClick: () => changeBlogStatus(blog._id, option.value),
        },
      },
      {
        key: `${blog._id}-delete`,
        text: "Delete",
        handlers: { onClick: () => changeBlogStatus(blog._id, "deleted") },
      },
    ];
  };

  const router = useRouter();

  // useEffect(() => {
  //   if (role !== "admin") {
  //     router.push("/");
  //   }
  // }, [role, router]);

  const renderBlogs = (blogs, status) => (
    <ul className="user-blogs-list">
      {blogs &&
        blogs
          .filter((blog) => blog.status === status)
          .map((blog) => (
            <li key={blog._id}>
              <Link href="/blog/editor/[id]" as={`/blog/editor/${blog._id}`}>
                <a>{blog.title}</a>
              </Link>
              <PortDropdown items={createOptions(blog)} />
            </li>
          ))}
    </ul>
  );

  return (
    <BaseLayout navClass="transparent" user={user} loading={loading}>
      <Masthead imagePath="/images/lake.jpg">
        <h1>Blogs Dashboard</h1>
        <span className="subheading">
          Lets write some nice blog today{" "}
          <Link href="/blog/editor" passHref>
            <Button color="primary">Create a new Blog</Button>
          </Link>
        </span>
      </Masthead>
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Published Blogs </h2>
            {renderBlogs(blogs, "published")}
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Draft Blogs </h2>
            {renderBlogs(blogs, "draft")}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

// export const getServerSideProps = withAuthSSR();
// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps({ req, res }) {
//     const session = getSession(req, res);
//     const { accessToken } = await getAccessToken(req, res);
//     const role =
//       session?.user[process.env.NEXT_PUBLIC_AUTH0_NAMESPACE + "/roles"][0];

//     const json = await new BlogApi(accessToken).getByUser();

//     debugger;
//     if (
//       !session ||
//       !session.user ||
//       // !accessToken ||
//       (role && !isAuthorized(session.user, role))
//     ) {
//       // if not logged in, no admin role here
//       return {
//         redirect: {
//           destination: "/api/auth/login",
//           permanent: false,
//         },
//       };
//     }
//     return { props: { user: session.user, role, blogs: json.data } };
//   },
// });
// export default Dashboard;

export default withAuth(Dashboard)("admin");
