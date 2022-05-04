import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CartType, StateCart } from "../../types/types";

export const CartContext = createContext<CartType>({});

var addOrRemove: 1 | 2 | 3 | undefined = undefined;


const CartProvider = ({ children }: { children: ReactNode }) => {

    const [shoppingCart, setShoppingCart] = useState<StateCart[]>([]);
    const [totalValue, setTotalValue] = useState(0);


    useEffect(() => {

        switch (addOrRemove) {
            case 1:
                setTotalValue(totalValue + 1)
                break;

            case 2:
                if (totalValue > 0) setTotalValue(totalValue - 1);
                break;
            case 3:
                let value = 0;
                for (const item of shoppingCart) {
                    value = item.qnt ? item.qnt + value : 0 + value
                }
                setTotalValue(value);
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

        addOrRemove = 1;

        setShoppingCart(newItem);
    }


    const deleteCartItem = (data: StateCart | undefined) => {

        let boolean = true;

        if (data?.qnt === 1) boolean = false;

        const newItem = boolean ? shoppingCart.map(cart => {
            return cart.key === data?.key ? {
                ...cart,
                qnt: cart.qnt ? cart.qnt - 1 : 0
            } : cart
        }) : shoppingCart.filter(cart => { return cart.key !== data?.key });

        addOrRemove = 2;

        setShoppingCart(newItem);
    }

    const removeCartItem = (data: StateCart | undefined) => {
        const remove = shoppingCart.filter(cart => { return cart.key !== data?.key })
        addOrRemove = 3;
        setShoppingCart(remove);
    }

    return (
        <CartContext.Provider value={{
            addCartItem: addCartItem,
            totalValue: totalValue,
            shoppingCart: shoppingCart,
            deleteCartItem: deleteCartItem,
            removeCartItem: removeCartItem

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