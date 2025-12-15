import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export const invalidateQuery = (key) => {
  queryClient.invalidateQueries({
    queryKey: key,
  });
}


export default queryClient;
