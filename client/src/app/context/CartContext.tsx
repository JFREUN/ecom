'use client'
import { Cart } from "@/types/cart";
import { CartContextType } from "@/types/context";
import { Product, StripeProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";



const CartContext = createContext<CartContextType>({
  cart: null,
  addItemToCart: (product: StripeProduct) => { },
  deleteItemFromCart: (id: string) => { },
  removeItemFromCart: (product: StripeProduct) => { },
  cartIsLoading: true,
  clearCart: () => { },
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartIsLoading, setCartIsLoading] = useState(true)

  const setCartToState = () => {
    const currentCart = localStorage.getItem("cart");

    if (currentCart) {
      setCart(
        localStorage.getItem("cart")
          ? JSON.parse(currentCart)
          : []
      );
      setCartIsLoading(false);
    }

  };
  const calculateTotalBill = (items: StripeProduct[]): number => {
    let totalBill = 0;
    items.forEach((item) => {
      totalBill += item.price * item.quantity;
    });
    return Math.round(totalBill * 100) / 100;;
  };

  const addItemToCart = async ({
    _id,
    name,
    description,
    price,
    quantity = 1,
    imageUrl,
    priceId,
  }: StripeProduct) => {
    const item: StripeProduct = {
      _id,
      description,
      name,
      price,
      quantity,
      imageUrl,
      priceId
    };

    const existingItemIndex = cart?.items.findIndex((i) => i._id === item._id);
    let newCartItems: StripeProduct[];

    if (existingItemIndex !== -1 && cart) {
      newCartItems = cart.items.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCartItems = [...(cart?.items || []), item];
    }
    const totalBill = calculateTotalBill(newCartItems);
    localStorage.setItem("cart", JSON.stringify({ items: newCartItems, bill: totalBill }));
    setCartToState();
  };

  const removeItemFromCart = async ({ _id }: StripeProduct) => {
    if (!cart) return;

    const existingItem = cart.items.find((item) => item._id === _id)
    let newCartItems: StripeProduct[] = [];

    if (existingItem && existingItem.quantity === 1) {
      newCartItems = cart.items.filter((item) => item._id !== existingItem._id);
    } else if (existingItem && existingItem.quantity > 1) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      newCartItems = cart.items.map((item) =>
        item._id === existingItem._id ? updatedItem : item
      );
    }
    const totalBill = calculateTotalBill(newCartItems);
    localStorage.setItem("cart", JSON.stringify({ items: newCartItems, bill: totalBill }));
    setCartToState();
  };

  const deleteItemFromCart = (id: string) => {
    const newCartItems = cart?.items?.filter((i) => i._id !== id);
    const totalBill = newCartItems ? calculateTotalBill(newCartItems) : 0;
    localStorage.setItem("cart", JSON.stringify({ items: newCartItems, bill: totalBill }));
    setCartToState();
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("cart")
  }

  useEffect(() => {
    setCartToState();
  }, []);

  return <CartContext.Provider
    value={{
      cart,
      addItemToCart,
      deleteItemFromCart,
      removeItemFromCart,
      cartIsLoading,
      clearCart
    }}
  >
    {children}
  </CartContext.Provider>;
};

export default CartContext
