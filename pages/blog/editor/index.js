import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { Editor } from "slate-simple-editor";
import withAuth from "hoc/withAuth";
import { useCreateBlog } from "@actions/blogs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BlogEditor = ({ user, loading }) => {
  const router = useRouter();
  const [
    createBlog,
    { data: createdBlog, error, loading: blogLoading },
  ] = useCreateBlog();

  const saveBlog = async (data) => {
    const createdBlog = await createBlog(data);
    toast.success("Blog created!");
    // go to update blog page after created a blog
    // router.push("/blog/editor/[id]", `/blog/editor/${createdBlog._id}`);
    // go to dashboard after created a blog
    router.push("/dashboard", "/dashboard");
  };

  useEffect(() => {
    console.log("got err");
    toast.error(error);
  }, [error]);

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <Editor
          header="Skriv om Sundet"
          onSave={saveBlog}
          loading={blogLoading}
        />
      </BasePage>
    </BaseLayout>
  );
};

// props coming from HOC
export default withAuth(BlogEditor)("admin");
