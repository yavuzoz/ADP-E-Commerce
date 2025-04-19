import { Cart } from "../model/ICart";
import { createContext, PropsWithChildren, useState, useContext } from "react";

interface CartContextValue {
    cart: Cart | null;
    setCart: (cart: Cart) => void;
    deleteItem: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCartContext must be used within a CartContextProvider");
    return context;
}

export function CartContextProvider({ children }: PropsWithChildren<{}>) {
    const [cart, setCart] = useState<Cart | null>(null);

    function deleteItem(productId: number, quantity: number) {
        // TODO: Implement deletion logic with API if needed
    }

    return (
        <CartContext.Provider value={{ cart, setCart, deleteItem }}>
            {children}
        </CartContext.Provider>
    );
}
