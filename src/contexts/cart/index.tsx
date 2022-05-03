import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CartType, StateCart } from "../../types/types";

export const CartContext = createContext<CartType>({});

var addOrRemove: boolean | undefined = undefined;

const CartProvider = ({ children }: { children: ReactNode }) => {

    const [shoppingCart, setShoppingCart] = useState<StateCart[]>([]);
    const [totalValue, setTotalValue] = useState(0);


    useEffect(() => {

        switch (addOrRemove) {
            case true:
                setTotalValue(totalValue + 1)
                break;

            case false:
                if (totalValue > 0) setTotalValue(totalValue - 1);
                break;
        }

    }, [shoppingCart])

    const addCartItem = (data: StateCart | undefined) => {

        if (!data) return

        let boolean = false;

        for (const value of shoppingCart) {
            if (value.key === data.key) {
                boolean = true;
                break;
            }
        }

        const newItem = boolean ? shoppingCart.map(cart => {
            return cart.key === data.key ? {
                ...cart,
                qnt: cart.qnt ? cart.qnt + 1 : 1
            } : cart
        }) : [...shoppingCart, { ...data, qnt: 1 }]

        addOrRemove = true;

        setShoppingCart(newItem);
    }


    const deleteCartItem = (data: StateCart | undefined) => {
        if (!data) return

        let boolean = true;

        if (data.qnt === 1) boolean = false;

        const newItem = boolean ? shoppingCart.map(cart => {
            return cart.key === data.key ? {
                ...cart,
                qnt: cart.qnt ? cart.qnt - 1 : 0
            } : cart
        }) : shoppingCart.filter(cart => { return cart.key !== data.key });

        addOrRemove = false;

        setShoppingCart(newItem);
    }

    return (
        <CartContext.Provider value={{
            addCartItem: addCartItem,
            totalValue: totalValue,
            shoppingCart: shoppingCart,
            deleteCartItem: deleteCartItem

        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) throw new Error('error Provider');

    return context;
}

export default CartProvider;