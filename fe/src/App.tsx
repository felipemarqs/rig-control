import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Router} from "./Router";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./app/contexts/AuthContext";
/*import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; */

import {SidebarProvider} from "./app/contexts/SidebarContext";

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
      <AuthProvider>
        <SidebarProvider>
          <Router />

          <Toaster position="bottom-center" reverseOrder={false} />
        </SidebarProvider>
      </AuthProvider>
      {/*  <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};
