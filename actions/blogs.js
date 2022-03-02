import axios from "axios";
import { useApiHandler } from "@actions/index";
import useSWR from "swr";
import { fetcher } from "@actions/index";

const BLOG_URL = "/api/v1/blogs";
const createBlog = (data) => axios.post(BLOG_URL, data);
const updateBlog = (id, data) => axios.patch(`${BLOG_URL}/${id}`, data);
const getBlogByUser = () => axios.get(`${BLOG_URL}/me`);

export const useCreateBlog = () => useApiHandler(createBlog);
export const useUpdateBlog = () => useApiHandler(updateBlog);
export const useGetBlogByUser = () => useApiHandler(getBlogByUser);

export const useGetBlog = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `${BLOG_URL}/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useGetUserBlogs = () => {
  const { data, error, ...rest } = useSWR(`${BLOG_URL}/me`, fetcher);
  return { data, error, loading: !data && !error, ...rest };
};
