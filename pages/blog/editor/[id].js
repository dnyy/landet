import { useUser } from "@auth0/nextjs-auth0";
import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { Editor } from "slate-simple-editor";
import withAuth from "hoc/withAuth";
import { toast } from "react-toastify";
import { useGetBlog, useUpdateBlog } from "@actions/blogs";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BlogUpdateEditor = ({ user, loading }) => {
  const router = useRouter();
  const { data } = useGetBlog(router.query.id);
  const [updateBlog, { error, loading: isBlogSaving }] = useUpdateBlog();

  const _updateBlog = async (data) => {
    await updateBlog(router.query.id, data);
    toast.success("Blog updated!");
  };

  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        {data?.content && (
          <Editor
            initialContent={data.content}
            header="Uppdatera om Sundet"
            onSave={_updateBlog}
            loading={isBlogSaving}
          />
        )}
      </BasePage>
    </BaseLayout>
  );
};

// props coming from HOC
export default withAuth(BlogUpdateEditor)("admin");
