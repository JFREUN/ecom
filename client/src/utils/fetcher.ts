import axios from "axios";

export const fetcher = async (url: string, token?: string | undefined) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.get(url).then((res) => res.data);
};

export const publicFetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const filterFetcher = async (
  // token: string | undefined,
  url: string,
  filter: string | boolean
) =>
  await axios.get(url, { headers: { filter: filter } }).then((res) => res.data);
