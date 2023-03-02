import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getArchives = (value) => {
  const file = axios
    .get(
      "https://whkkg99fl7.execute-api.us-east-2.amazonaws.com/5ca34674s6/volumes",
      {
        headers: {
          "x-api-key": "beL2l7aY9N17CT49sQcmC9mNKyARq2KX6MRisGfv",
        },
        params: {
          attributes: value,
        },
      }
    )
    .then((res) => res.data);
  return file;
};

export const useArchives = () =>
  useQuery({
    queryKey: ["Archives"],
    queryFn: () => getArchives("issues"),
    refetchOnMount: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });
