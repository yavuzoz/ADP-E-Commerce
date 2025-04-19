import { Cart } from "../model/ICart";
import { createContext } from "react";


interface CartContextValue {
    cart: Cart | null;
    setCart: (cart: Cart) => void;
    deleteItem: (productId: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);