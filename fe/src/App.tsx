import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Router} from "./Router";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./app/contexts/AuthContext";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {SidebarProvider} from "./app/contexts/SidebarContext";
import {FiltersProvider} from "./app/contexts/FiltersContext";
import {ThemeProvider} from "./app/contexts/ThemeContext";

// Configurando uma instância do QueryClient com opções padrão
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
    // Provedor de QueryClient para gerenciar o estado global dos dados
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <FiltersProvider>
            <SidebarProvider>
              {/* Componente de roteamento principal */}
              <Router />
              <Toaster position="bottom-center" reverseOrder={false} />
            </SidebarProvider>
          </FiltersProvider>
        </AuthProvider>
      </ThemeProvider>

      {/* Ferramenta de desenvolvimento para visualizar o estado dos dados */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
