import { CartProvider } from "./CartContext"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from "../../themes/theme";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./AuthContext";

export const GlobalProvider = ({ children }: any) => {
    return (
        <AuthProvider>
            <CartProvider>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </CartProvider>
        </AuthProvider>
    )
}