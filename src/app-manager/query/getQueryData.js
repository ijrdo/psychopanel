import { useQueryClient } from "@tanstack/react-query";

export const useQueryData = (key) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(key);
};
