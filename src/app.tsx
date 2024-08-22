import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "components/AuthProvider/AuthProvider"
import { FC, PropsWithChildren } from "react"
import { HelmetProvider } from "react-helmet-async"
import { AppRouter } from "./AppRouter"
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary"
import { GlobalSnackbar } from "./components/GlobalSnackbar/GlobalSnackbar"
import { dark } from "./theme"
import "./theme/globalFonts"
import { AuthProvider_2 } from "components/AuthProvider_2/AuthProvider_2"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PaypalProvider from "components/PaypalProvider/PaypalProvider"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
})

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <PaypalProvider>
                  {children}
                <GlobalSnackbar />
              </PaypalProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export const App: FC = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}
