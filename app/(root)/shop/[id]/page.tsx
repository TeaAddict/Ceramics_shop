"use client";

import QuantityPicker from "@/components/shared/QuantityPicker";
import PhotoSwipeCarousel from "@/components/shop/PhotoSwipeCarousel";
import { Button } from "@/components/ui/button";
import { addItem, removeItem } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useItem } from "@/hooks/useItem";
import BackButton from "@/components/shared/BackButton";

const ItemPage = ({ params }: { params: { id: string } }) => {
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const cartItem = cart.find((item) => item.id === params.id);
  const { data: item } = useItem(params.id);
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);

  if (!item || Object.keys(item).length === 0) return;

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

  function handleRemoveFromCart() {
    if (item) dispatch(removeItem(params.id));
  }

  function handleIncrease() {
    if (quantity < item!.stock) setQuantity((quantity: number) => quantity + 1);
  }
  function handleDecrease() {
    if (quantity > 1) setQuantity((quantity: number) => quantity - 1);
  }

  return (
    <section className="padding-container flex flex-col gap-5">
      <BackButton />

      <div className="flex flex-col md:flex-row gap-5 md:gap-40 justify-center">
        <h3 className="font-semibold text-3xl md:hidden capitalize">
          {item.title}
        </h3>
        <div>
          <PhotoSwipeCarousel
            galleryID="testing"
            images={item.pictures.map((image) => {
              return {
                largeURL: image.name,
                thumbnailURL: image.name,
                width: image.width,
                height: image.height,
              };
            })}
          />
          <p className="hidden md:block">===IDK SOME FANCY IMAGE SLIDE===</p>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="font-semibold text-3xl hidden md:block capitalize">
            {item.title}
          </h3>

          {!cartItem ? (
            <div className="space-y-5 flex md:flex-col justify-between md:justify-normal">
              <div className="space-y-1">
                <QuantityPicker
                  currentQuantity={quantity}
                  decreaseFunc={handleDecrease}
                  increaseFunc={handleIncrease}
                />
                <p>in stock: {item.stock}</p>
              </div>

              <Button onClick={handleAddToCart}>ADD TO CART</Button>
            </div>
          ) : (
            <Button onClick={handleRemoveFromCart}>Remove from cart</Button>
          )}
          {item.description && (
            <p className="md:max-w-72 capitalize">{item.description}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemPage;
