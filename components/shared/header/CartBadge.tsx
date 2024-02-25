"use client";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const CartBadge = ({ size = "default" }: { size?: "default" | "small" }) => {
  const cart = useAppSelector((state) => state.cartReducer.cartItems);

  if (size === "default")
    return (
      <Link
        className="flex relative p-3 hover:outline-none hover:outline-black hover:outline-1 hover:outline-offset-[-5px]  rounded-full"
        href="/cart"
      >
        <IoCartOutline size={40} className="cursor-pointer" />
        {cart.length > 0 && (
          <span className="absolute flex justify-center items-center w-[30px] h-[30px] bg-primary rounded-full bottom-7 left-7 cursor-pointer">
            <p>{cart.length}</p>
          </span>
        )}
      </Link>
    );

  if (size === "small")
    return (
      <Link className="flex relative p-3" href="/cart">
        <IoCartOutline size={30} className="cursor-pointer text-white" />
        {cart.length > 0 && (
          <span className="absolute flex justify-center items-center w-[30px] h-[30px] bg-primary rounded-full bottom-6 left-6 cursor-pointer">
            <p>{cart.length}</p>
          </span>
        )}
      </Link>
    );
};

export default CartBadge;
