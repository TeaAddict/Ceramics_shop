"use client";

import QuantityPicker from "@/components/shared/QuantityPicker2";
import QuantityPicker2 from "@/components/shared/QuantityPicker";
import PhotoSwipeCarousel from "@/components/shop/PhotoSwipeCarousel";
import { Button } from "@/components/ui/button";
import { TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import { addItem, removeItem } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ItemPage = ({ params }: { params: { id: string } }) => {
  const cart = useAppSelector((state) => state.cartReducer.cartItems);

  const cartItem = cart.find((item) => item.id === params.id);

  const item = TEST_MERCHANDISE2.find((item) => item.id === params.id);

  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);

  if (!item) return <p>Error</p>;

  function handleAddToCart() {
    if (item)
      dispatch(
        addItem({
          id: item.id,
          quantity: quantity,
          stock: item.stock,
          unitPrice: item.price,
          totalPrice: quantity * item.price,
          picture: item.thumbnailImage.url,
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
    <section className="padding-container flex justify-center gap-48">
      <div>
        <PhotoSwipeCarousel
          galleryID="testing"
          images={item.images.map((image) => {
            return {
              largeURL: image.url,
              thumbnailURL: image.url,
              width: image.width,
              height: image.height,
            };
          })}
        />
        <p>===IDK SOME FANCY IMAGE SLIDE===</p>
      </div>
      <div className="flex flex-col gap-10">
        <h3 className="font-semibold text-3xl">{item.title}</h3>

        {!cartItem ? (
          <div className="space-y-5">
            <div className="space-y-1">
              <QuantityPicker2
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
        <p className="max-w-72">{item.description}</p>
      </div>
    </section>
  );
};

export default ItemPage;
