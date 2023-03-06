import { useQueryClient } from "@tanstack/react-query";

export const useQueryData = (key: string) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([key]);
};
