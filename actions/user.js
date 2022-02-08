import useSWR from "swr";
import { fetcher } from "@actions/index";

/**
 * TODO: check if this is needed or if the useUser hook from @auth0 is enough and uses SWR
 */
export const useGetUser = () => {
  const { data, error, ...rest } = useSWR("/api/auth/me", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};
