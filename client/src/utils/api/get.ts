import axios from "axios";

export const get = (route: string, token?: any) => {
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const url = `${process.env.API_URL}/${route}`;

  //   return axios.get(url, headers);
  return axios.get(url);
};
