import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Router} from "./Router";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />

      <Toaster position="bottom-center" reverseOrder={false} />
    </QueryClientProvider>
  );
};
