import React, { useState } from "react";
import QuantityPicker from "../shared/QuantityPicker";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItem, removeItem } from "@/redux/features/cartSlice";
import { ProductSchema } from "@/lib/types";

const ItemCartInterface = ({
  item,
  params,
}: {
  item: ProductSchema | null;
  params: { id: string };
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useAppSelector((state) => state.cartReducer.cartItems);

  const cartItem = cart.find((item) => item.id === params.id);

  function handleAddToCart() {
    if (item)
      dispatch(
        addItem({
          id: item.id,
          quantity: quantity,
          stock: item.stock,
          unitPrice: item.price,
          totalPrice: quantity * item.price,
          picture: item.thumbnail.name,
          title: item.title,
        })
      );
  }

  function handleIncrease() {
    if (quantity < item!.stock) setQuantity((quantity: number) => quantity + 1);
  }
  function handleDecrease() {
    if (quantity > 1) setQuantity((quantity: number) => quantity - 1);
  }
  function handleRemoveFromCart() {
    if (item) dispatch(removeItem(params.id));
  }

  if (cartItem)
    return <Button onClick={handleRemoveFromCart}>Remove from cart</Button>;

  return (
    <div className="space-y-5 flex md:flex-col justify-around md:justify-normal">
      <div className="space-y-1">
        <QuantityPicker
          currentQuantity={quantity}
          decreaseFunc={handleDecrease}
          increaseFunc={handleIncrease}
        />
        <p>in stock: {item?.stock}</p>
      </div>
      <Button onClick={handleAddToCart}>ADD TO CART</Button>
    </div>
  );
};

export default ItemCartInterface;
