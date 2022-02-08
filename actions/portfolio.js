import axios from "axios";
import useSWR from "swr";
import { useApiHandler } from "@actions/index";
import { fetcher } from "@actions/index";

const portfolioUrl = "/api/v1/portfolio";
const createPortfolio = (data) => axios.post(portfolioUrl, data);
const updatePortfolio = (id, data) =>
  axios.patch(`${portfolioUrl}/${id}`, data);
const deletePortfolio = (id) => axios.delete(`${portfolioUrl}/${id}`);

export const useCreatePortfolio = () => useApiHandler(createPortfolio);
export const useUpdatePortfolio = () => useApiHandler(updatePortfolio);
export const useDeletePortfolio = () => useApiHandler(deletePortfolio);

export const useGetPortfolio = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `${portfolioUrl}/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};
