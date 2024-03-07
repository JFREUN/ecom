import { CartProvider } from "./CartContext"

export const GlobalProvider = ({ children }: any) => {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    )
}