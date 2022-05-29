import useSWR from "swr";
import { fetcher } from "@actions/index";

/**
 * TODO: check if this is needed or if the useUser hook from @auth0 is enough and uses SWR
 */
export const useGetUser = () => {
  const { data, error, ...rest } = useSWR("/api/auth/me", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};

const USERS_URL = "/api/v1/users";
const getUsers = () => axios.get(USERS_URL);
export const useGetAllUsers = () => useApiHandler(getUsers);

export const useGetUsers = () => {
  const { data, error, ...rest } = useSWR(USERS_URL, fetcher);
  console.log("DATA", data);
  return { data, error, loading: !data && !error, ...rest };
};
